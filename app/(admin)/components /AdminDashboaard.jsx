import { Activity, AlertCircle, BarChart3, Bell, Calendar, Download, Eye, FileText, Search, Settings, Shield, UserCheck, Users, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api, setAuthToken } from "../../shared/api.js"
import { Button } from "../Lawyer/ui/button.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Lawyer/ui/card.jsx"
import { Skeleton } from "../Lawyer/ui/skeleton.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Lawyer/ui/table.jsx"

export default function Dashboard() {
  const navigate = useNavigate()
  const [lawyers, setLawyers] = useState([])
  const [pendingLawyers, setPendingLawyers] = useState([])
  const [users, setUsers] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // UI state
  const [q, setQ] = useState("")
  const [spec, setSpec] = useState("all")
  const [sortKey, setSortKey] = useState("fullName")
  const [sortDir, setSortDir] = useState("asc")
  const [page, setPage] = useState(1)
  const pageSize = 10
  // These must be declared before any early returns to keep hooks order stable
  const [activeSection, setActiveSection] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Document review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewData, setReviewData] = useState(null)
  const [reviewLoading, setReviewLoading] = useState(false)
  
  // Document viewer state
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerUrl, setViewerUrl] = useState('')
  const [viewerName, setViewerName] = useState('')
  const [viewerType, setViewerType] = useState('') // 'image' or 'document'

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    setAuthToken(token)
    const loadData = async () => {
      try {
        const [approved, pending, usersRes, appointmentsRes] = await Promise.all([
          api.get("/v1/lawyers?status=approved"),
          api.get("/v1/lawyers?status=pending"),
          api.get("/v1/user"),
          api.get("/v1/appointments"),
        ])
        
        console.log('📊 API Responses:', {
          approved: approved,
          pending: pending,
          users: usersRes,
          appointments: appointmentsRes
        });
        
        // Handle different response formats - api.js wraps response in { data: ... }
        // Backend returns { lawyers: [...], total: ... } or just [...]
        const approvedData = approved?.data || approved;
        const pendingData = pending?.data || pending;
        
        const approvedLawyers = Array.isArray(approvedData?.lawyers) 
          ? approvedData.lawyers 
          : Array.isArray(approvedData) 
            ? approvedData 
            : [];
        const pendingLawyers = Array.isArray(pendingData?.lawyers) 
          ? pendingData.lawyers 
          : Array.isArray(pendingData) 
            ? pendingData 
            : [];
        
        console.log('📋 Parsed lawyers:', {
          approved: approvedLawyers.length,
          pending: pendingLawyers.length
        });
        
        setLawyers(approvedLawyers);
        setPendingLawyers(pendingLawyers);
        setUsers(usersRes?.data?.users || usersRes?.data || usersRes || []);
        setAppointments(appointmentsRes?.data?.appointments || appointmentsRes?.data || appointmentsRes || []);
        
        // Clear any previous errors on success
        setError("");
      } catch (e) {
        console.error('Error loading data:', e);
        console.error('Error details:', {
          status: e?.status,
          data: e?.data,
          message: e?.message,
          isNetworkError: e?.isNetworkError
        });
        
        if (e?.status === 401 || e?.data?.message?.includes('Unauthorized')) {
          localStorage.removeItem('token')
          navigate('/admin/login')
          return
        }
        
        // Extract error message properly - handle nested objects
        let errorMessage = "Failed to load lawyers";
        
        if (e?.isNetworkError) {
          errorMessage = e?.message || "Cannot connect to server. Please ensure the backend server is running.";
        } else if (e?.data) {
          // Check various possible error message locations
          if (typeof e.data === 'string') {
            errorMessage = e.data;
          } else if (e.data?.error) {
            errorMessage = typeof e.data.error === 'string' ? e.data.error : JSON.stringify(e.data.error);
          } else if (e.data?.message) {
            errorMessage = typeof e.data.message === 'string' ? e.data.message : JSON.stringify(e.data.message);
          } else if (e.data?.error?.message) {
            errorMessage = e.data.error.message;
          } else {
            // If data is an object, try to extract meaningful info
            errorMessage = `Error: ${JSON.stringify(e.data)}`;
          }
        } else if (e?.message) {
          errorMessage = e.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false)
      }
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // navigate is stable from react-router-dom, so we can safely omit it

  // Derived UI data
  const specializations = useMemo(() => {
    const all = Array.from(
      new Set(lawyers.map((l) => (l.specialization || "").trim()).filter(Boolean))
    )
    return all.sort((a, b) => a.localeCompare(b))
  }, [lawyers])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const list = lawyers.filter((l) => {
      const loc = [l.city, l.state, l.country].filter(Boolean).join(", ")
      const matchesQuery =
        !query ||
        l.fullName?.toLowerCase().includes(query) ||
        l.userId?.email?.toLowerCase().includes(query) ||
        l.barNumber?.toLowerCase().includes(query) ||
        l.specialization?.toLowerCase().includes(query) ||
        loc.toLowerCase().includes(query)

      const matchesSpec =
        spec === "all" || (l.specialization || "").toLowerCase() === spec.toLowerCase()

      return matchesQuery && matchesSpec
    })

    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1
      let av = a[sortKey]
      let bv = b[sortKey]

      if (["fullName", "specialization", "city"].includes(sortKey)) {
        av = (av || "").toString().toLowerCase()
        bv = (bv || "").toString().toLowerCase()
        return av.localeCompare(bv) * dir
      }

      if (sortKey === "yearsOfExperience") {
        return ((av || 0) - (bv || 0)) * dir
      }

      return 0
    })

    return list
  }, [lawyers, q, spec, sortKey, sortDir])

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return users.filter((user) => {
      const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim()
      const email = user.email || ""
      const type = user.userType || user.type || ""
      return (
        !query ||
        fullName.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query)
      )
    })
  }, [users, searchQuery])

  const scheduledAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const status = (appt.status || "").toLowerCase()
      return status === "confirmed"
    })
  }, [appointments])

  const analytics = useMemo(() => {
    if (!appointments.length) {
      return {
        totalAppointments: 0,
        paidRevenue: 0,
        avgFee: 0,
        paidCount: 0,
        statusCounts: { pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
        monthly: [],
        topSpecializations: [],
        paidAppointments: [],
      }
    }

    const statusCounts = { pending: 0, confirmed: 0, completed: 0, cancelled: 0 }
    let paidRevenue = 0
    let paidCount = 0
    const monthlyMap = new Map()
    const specMap = new Map()
    const paidAppointments = []

    appointments.forEach((appt) => {
      const status = (appt.status || "pending").toLowerCase()
      if (statusCounts[status] !== undefined) {
        statusCounts[status] += 1
      }

      const fee = Number(appt.consultationFee) || 0
      if ((appt.paymentStatus || "").toLowerCase() === "paid") {
        paidRevenue += fee
        paidCount += 1
        paidAppointments.push(appt)
      }

      const dateSource = appt.appointmentDate || appt.createdAt
      const dateObj = dateSource ? new Date(dateSource) : null
      if (dateObj && !isNaN(dateObj.getTime())) {
        const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`
        const entry =
          monthlyMap.get(key) || {
            key,
            date: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1),
            total: 0,
            confirmed: 0,
            pending: 0,
            completed: 0,
            cancelled: 0,
            revenue: 0,
          }
        entry.total += 1
        if (entry[status] !== undefined) {
          entry[status] += 1
        }
        if ((appt.paymentStatus || "").toLowerCase() === "paid") {
          entry.revenue += fee
        }
        monthlyMap.set(key, entry)
      }

      const spec = appt.caseType || appt.consultationType || "Other"
      specMap.set(spec, (specMap.get(spec) || 0) + 1)
    })

    const monthly = Array.from(monthlyMap.values()).sort((a, b) => b.date - a.date)
    const topSpecializations = Array.from(specMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / appointments.length) * 100),
      }))
      .slice(0, 5)

    paidAppointments.sort((a, b) => {
      const dateA = new Date(a.appointmentDate || a.createdAt || 0).getTime()
      const dateB = new Date(b.appointmentDate || b.createdAt || 0).getTime()
      return dateB - dateA
    })

    return {
      totalAppointments: appointments.length,
      paidRevenue,
      avgFee: paidCount ? paidRevenue / paidCount : 0,
      paidCount,
      statusCounts,
      monthly,
      topSpecializations,
      paidAppointments: paidAppointments.slice(0, 6),
    }
  }, [appointments])

  const formatDate = (date) => {
    if (!date) return "—"
    try {
      return new Date(date).toLocaleDateString()
    } catch {
      return date
    }
  }

  const formatTime = (date, slot) => {
    if (slot) return slot
    if (!date) return "—"
    try {
      return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } catch {
      return "—"
    }
  }

  const formatCurrency = (amount) => {
    const value = Number(amount) || 0
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value)
  }

  const formatMonthLabel = (date) => {
    if (!date) return "—"
    try {
      return date.toLocaleString("en-US", { month: "short", year: "numeric" })
    } catch {
      return "—"
    }
  }

  const getClientName = (appt) => {
    if (appt.clientName) return appt.clientName
    if (appt.clientId) {
      const first = appt.clientId.firstname || ""
      const last = appt.clientId.lastname || ""
      const full = `${first} ${last}`.trim()
      return full || appt.clientId.email || "Client"
    }
    return "Client"
  }

  const getLawyerName = (appt) => {
    if (appt.lawyerName) return appt.lawyerName
    if (appt.lawyerId) {
      const first = appt.lawyerId.firstname || ""
      const last = appt.lawyerId.lastname || ""
      const full = `${first} ${last}`.trim()
      return full || appt.lawyerId.email || "Lawyer"
    }
    return "Lawyer"
  }

  const getAppointmentType = (appt) => appt.caseType || appt.consultationType || "Consultation"

  const renderStatusBadge = (status) => {
    const normalized = (status || "").toLowerCase()
    const common = "inline-flex items-center rounded-full text-xs px-2 py-0.5 font-medium"
    switch (normalized) {
      case "confirmed":
        return <span className={`${common} bg-green-600/15 text-green-600`}>Confirmed</span>
      case "pending":
        return <span className={`${common} bg-amber-500/15 text-amber-600`}>Pending</span>
      case "completed":
        return <span className={`${common} bg-blue-600/15 text-blue-600`}>Completed</span>
      case "cancelled":
        return <span className={`${common} bg-gray-500/15 text-gray-600`}>Cancelled</span>
      case "rejected":
        return <span className={`${common} bg-red-500/15 text-red-600`}>Rejected</span>
      default:
        return <span className={`${common} bg-gray-400/15 text-gray-600`}>{status || "Unknown"}</span>
    }
  }

  const disputeRecords = useMemo(() => {
    if (!appointments.length) return []
    return appointments
      .filter((appt) => {
        const paymentStatus = (appt.paymentStatus || "").toLowerCase()
        const status = (appt.status || "").toLowerCase()
        return (
          paymentStatus === "refunded" ||
          (paymentStatus === "paid" && ["cancelled", "rejected"].includes(status)) ||
          appt.disputeFlag
        )
      })
      .map((appt) => {
        const paymentStatus = (appt.paymentStatus || "").toLowerCase()
        const status = (appt.status || "").toLowerCase()
        let disputeStatus = paymentStatus === "refunded" ? "Refunded" : "Open"
        let reason = "Client reported payment issue"

        if (paymentStatus === "refunded") {
          reason = "Refund issued to client"
        } else if (paymentStatus === "paid" && status === "cancelled") {
          reason = "Appointment cancelled after payment"
        } else if (paymentStatus === "paid" && status === "rejected") {
          reason = "Booking rejected after payment"
        } else if (appt.disputeReason) {
          reason = appt.disputeReason
        }

        const amount = Number(appt.consultationFee) || 0
        const createdAt = appt.updatedAt || appt.appointmentDate || appt.createdAt

        return {
          id: appt._id,
          client: getClientName(appt),
          lawyer: getLawyerName(appt),
          amount,
          reason,
          disputeStatus,
          paymentStatus: paymentStatus || "unpaid",
          appointmentStatus: status || "pending",
          createdAt,
        }
      })
  }, [appointments])

  const recentActivity = useMemo(() => {
    const events = []

    pendingLawyers.slice(0, 5).forEach((lawyer) => {
      events.push({
        action: "New Lawyer Registration",
        user: lawyer.email || lawyer.userId?.email || "Unknown",
        timestamp: lawyer.createdAt || lawyer.updatedAt || new Date().toISOString(),
        status: "Pending",
      })
    })

    appointments.slice(0, 8).forEach((appt) => {
      events.push({
        action: `Appointment ${appt.status ? appt.status.toUpperCase() : "Update"}`,
        user: getClientName(appt),
        timestamp: appt.updatedAt || appt.appointmentDate || appt.createdAt || new Date().toISOString(),
        status: (appt.status || "Pending").replace(/\b\w/g, (l) => l.toUpperCase()),
      })
    })

    disputeRecords.slice(0, 5).forEach((dispute) => {
      events.push({
        action: "Payment Dispute",
        user: dispute.client,
        timestamp: dispute.createdAt || new Date().toISOString(),
        status: dispute.disputeStatus,
      })
    })

    return events
      .filter((evt) => evt?.timestamp)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
  }, [pendingLawyers, appointments, disputeRecords])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [q, spec])

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Bar #", "Specialization", "Experience", "Location"],
      ...filtered.map((l) => [
        l.fullName || "",
        l.userId?.email || "",
        l.barNumber || "",
        l.specialization || "",
        `${l.yearsOfExperience ?? 0}`,
        [l.city, l.state, l.country].filter(Boolean).join(", "),
      ]),
    ]
    const csv = rows
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lawyers.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader className="p-4">
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  // If an error occurred, continue rendering with mock data instead of showing an alert

  
  const total = lawyers.length
  const totalExperience = lawyers.reduce((sum, l) => sum + (l.yearsOfExperience || 0), 0)
  const uniqueSpecs = specializations.length

  const openDisputesCount = disputeRecords.filter((d) => d.disputeStatus !== "Refunded").length

  const stats = {
    totalUsers: users.length,
    totalLawyers: total,
    pendingAppointments: appointments.filter((a) => (a.status || "").toLowerCase() === "pending").length,
    openDisputes: openDisputesCount,
  }

  const failedLoginAttempts = recentActivity.filter((evt) => evt.status?.toLowerCase() === "failed").length
  const activeSessions = users.filter((u) => !!u.lastLogin).length || Math.max(users.length, 1)
  const systemUptime = appointments.length
    ? `${(99 - Math.min(disputeRecords.length, 30) * 0.05).toFixed(2)}%`
    : "99.9%"

  const navButtonClass = (section) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border border-transparent ${
      activeSection === section
        ? "bg-gradient-to-r from-[#f3ce8c] via-[#eab974] to-[#d79c54] text-[#2f1c0e] shadow-[0_8px_26px_rgba(36,18,3,0.35)] border-[#f8dbaa]"
        : "text-[#d8c1a3] hover:text-[#f8dbaa] hover:bg-white/5"
    }`

  return (
    <div className="flex h-screen bg-[#fff9f4] text-[#2f1c0e]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#3a2a1a] bg-[#1a120d] flex flex-col">
          <div className="p-6 border-b border-[#3a2a1a]">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-[#f3ce8c]" />
              <div>
                <h1 className="text-xl font-bold text-white">Law Sphere</h1>
                <p className="text-xs text-[#c3a983]">Admin Dashboard</p>
              </div>
            </div>
          </div>
  
          <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setActiveSection("overview")} className={navButtonClass("overview")}>
              <BarChart3 className="h-5 w-5" /> Overview
            </button>
  
            <button onClick={() => setActiveSection("users")} className={navButtonClass("users")}>
              <Users className="h-5 w-5" /> User Management
            </button>
  
            <button onClick={() => setActiveSection("lawyers")} className={navButtonClass("lawyers")}>
              <UserCheck className="h-5 w-5" />
              Lawyer Verification
              {pendingLawyers.length > 0 && (
                <span className="ml-auto bg-[#f97373] text-white text-xs px-2 py-1 rounded-full">
                  {pendingLawyers.length}
                </span>
              )}
            </button>
  
            <button onClick={() => setActiveSection("appointments")} className={navButtonClass("appointments")}>
              <Calendar className="h-5 w-5" />
              Appointments
              {stats.pendingAppointments > 0 && (
                <span className="ml-auto bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                  {stats.pendingAppointments}
                </span>
              )}
            </button>
  
            <button onClick={() => setActiveSection("reports")} className={navButtonClass("reports")}>
              <FileText className="h-5 w-5" /> Reports & Analytics
            </button>
  
            <button onClick={() => setActiveSection("disputes")} className={navButtonClass("disputes")}>
              <AlertCircle className="h-5 w-5" />
              Financial Disputes
              {stats.openDisputes > 0 && (
                <span className="ml-auto bg-[#f97373] text-white text-xs px-2 py-1 rounded-full">
                  {stats.openDisputes}
                </span>
              )}
            </button>
  
            <button onClick={() => setActiveSection("logs")} className={navButtonClass("logs")}>
              <Activity className="h-5 w-5" /> System Logs
            </button>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-bold">Error Loading Data</p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={() => {
                      setError("");
                      window.location.reload();
                    }}
                    className="mt-2 text-sm underline hover:text-red-900"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <header className="border-b border-[#fce8cf] bg-[#fff9f4] sticky top-0 z-10">
            <div className="flex items-center justify-between px-8 py-4">
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c99d66]" />
                <input
                  placeholder="Search users, lawyers, appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border border-[#f3ce8c] bg-white rounded-lg text-sm text-[#2f1c0e] placeholder:text-[#c99d66]"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-[#f3ce8c]/30 text-[#c99d66]">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-[#f3ce8c]/30 text-[#c99d66]">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-6 bg-[#fff9f4]">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                  <p className="text-gray-500 mt-1">Monitor platform performance and key metrics</p>
                </div>

                {/* Pending Lawyer Verification appears at the top */
                }
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Profile Registrations</CardTitle>
                    <CardDescription>
                      New lawyer registrations awaiting admin approval before profile creation
                      <br />
                      <span className="text-sm text-blue-600 mt-1 block">
                        Required for approval: Full Name, Bar Number, Specialization, Experience, City, CNIC, Phone (10+ digits), and at least one document
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingLawyers.length === 0 ? (
                      <div className="text-gray-400">No pending registrations.</div>
                    ) : (
                      <div className="space-y-4">
                        {pendingLawyers.map((l) => (
                          <div key={l._id || l.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                            <div className="flex items-start justify-between gap-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                <div>
                                  <div className="text-lg font-semibold">{l.fullName || l.name}</div>
                                  <div className="text-sm text-gray-500">{l.userId?.email || l.email}</div>
                                  <div className="mt-3">
                                    <div className="text-xs uppercase text-gray-500">Specialization</div>
                                    <div className="font-medium">{l.specialization}</div>
                                  </div>
                                  <div className="mt-3">
                                    <div className="text-xs uppercase text-gray-500">Bar Number</div>
                                    <div className="font-medium">{l.barNumber}</div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs uppercase text-gray-500">Experience</div>
                                  <div className="font-medium">{l.yearsOfExperience ?? l.experience ?? '-'}</div>
                                  <div className="mt-3">
                                    <div className="text-xs uppercase text-gray-500">Phone</div>
                                    <div className="font-medium">{l.phone || '-'}</div>
                                  </div>
                                  <div className="mt-3">
                                    <div className="text-xs uppercase text-gray-500">Submitted on</div>
                                    <div className="font-medium">{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : '-'}</div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <div className="text-xs uppercase text-gray-500">Firm / Office</div>
                                    <div className="font-medium">{l.firmName || '-'}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase text-gray-500">City</div>
                                    <div className="font-medium">{l.city || '-'}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase text-gray-500">CNIC / ID</div>
                                    <div className="font-medium">{l.cnicNumber || '-'}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase text-gray-500">Submitted Documents</div>
                                    <div className="font-medium">{l.submittedDocuments ?? 0}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 shrink-0">
                                {/* Check for missing required fields */}
                                {(() => {
                                  const missing = [];
                                  if (!l.fullName) missing.push("Full Name");
                                  if (!l.barNumber) missing.push("Bar Number");
                                  if (!l.specialization) missing.push("Specialization");
                                  if (!l.yearsOfExperience && l.yearsOfExperience !== 0) missing.push("Experience");
                                  if (!l.city) missing.push("City");
                                  if (!l.cnicNumber) missing.push("CNIC");
                                  if (!l.phone || l.phone.length < 10) missing.push("Phone (10+ digits)");
                                  if ((l.submittedDocuments || 0) === 0) missing.push("Documents");
                                  
                                  return missing.length > 0 ? (
                                    <div className="text-xs text-red-600 mb-2 p-2 bg-red-50 rounded">
                                      <strong>Missing:</strong> {missing.join(", ")}
                                    </div>
                                  ) : (
                                    <div className="text-xs text-green-600 mb-2 p-2 bg-green-50 rounded">
                                      ✓ All required fields complete
                                    </div>
                                  );
                                })()}
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={async () => {
                                    try {
                                      // Use userId (User ID) for approval, not Lawyer profile ID
                                      const id = l.userId || l._id || l.id
                                      if (!id) {
                                        alert('Error: User ID not found')
                                        return
                                      }
                                      console.log('Approving lawyer with User ID:', id)
                                      await api.post(`/v1/lawyers/${id}/approve`)
                                      const [approved, pending] = await Promise.all([
                                        api.get('/v1/lawyers?status=approved'),
                                        api.get('/v1/lawyers?status=pending'),
                                      ])
                                      setLawyers(approved.data?.lawyers || approved.data || [])
                                      setPendingLawyers(pending.data?.lawyers || pending.data || [])
                                    } catch (err) {
                                      console.error('Approval error:', err)
                                      
                                      // Extract error message properly
                                      const errorMsg = err?.data?.error || err?.data?.message || err?.message || "Failed to approve lawyer";
                                      
                                      // Handle specific validation errors
                                      if (typeof errorMsg === 'string' && (errorMsg.includes("Profile is incomplete") || errorMsg.includes("missing"))) {
                                        // Try to get the missing fields from the error response
                                        const missingFields = err?.data?.missing || err?.missing || [];
                                        const missingList = missingFields.length > 0 
                                          ? `\n\nMissing fields: ${missingFields.join(', ')}`
                                          : '';
                                        
                                        alert(`Cannot approve lawyer: Profile is incomplete.${missingList}\n\nPlease ensure the lawyer has completed their profile with all required information.`)
                                      } else {
                                        const displayMsg = typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg);
                                        alert(displayMsg || 'Failed to approve lawyer. Please try again.')
                                      }
                                    }
                                  }}
                                >
                                  Approve & Create Profile
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={async () => {
                                    try {
                                      const id = l.userId || l._id || l.id
                                      if (!id) {
                                        alert('Error: User ID not found')
                                        return
                                      }
                                      setReviewLoading(true)
                                      setReviewModalOpen(true)
                                      // Use the correct endpoint
                                      const { data } = await api.get(`/v1/lawyers/${id}/review`)
                                      console.log('📋 Review data received:', data)
                                      console.log('📋 Full data object:', JSON.stringify(data, null, 2))
                                      console.log('📋 Licenses:', data?.licenses, 'Type:', typeof data?.licenses, 'IsArray:', Array.isArray(data?.licenses), 'Count:', data?.licenses?.length)
                                      console.log('📋 Documents:', data?.documents, 'Type:', typeof data?.documents, 'IsArray:', Array.isArray(data?.documents), 'Count:', data?.documents?.length)
                                      
                                      // Ensure licenses and documents are arrays
                                      const normalizedData = {
                                        ...data,
                                        email: l.userId?.email || l.email || '',
                                        licenses: Array.isArray(data?.licenses) ? data.licenses : (data?.licenses ? [data.licenses] : []),
                                        documents: Array.isArray(data?.documents) ? data.documents : (data?.documents ? [data.documents] : []),
                                      }
                                      
                                      console.log('📋 Normalized data:', normalizedData)
                                      console.log('📋 Normalized licenses count:', normalizedData.licenses.length)
                                      console.log('📋 Normalized documents count:', normalizedData.documents.length)
                                      
                                      setReviewData(normalizedData)
                                    } catch (err) {
                                      console.error('Error fetching review data:', err)
                                      const errorMsg = err?.data?.error || err?.data?.message || err?.message || 'Failed to load documents'
                                      alert(`Error: ${errorMsg}`)
                                      setReviewModalOpen(false)
                                    } finally {
                                      setReviewLoading(false)
                                    }
                                  }}
                                >
                                  Review Documents
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={async () => {
                                    try {
                                      const id = l._id || l.id
                                      if (!id) return
                                      await api.post(`/lawyers/${id}/reject`, { reason: 'Insufficient documents' })
                                      const pending = await api.get('/lawyers?status=pending')
                                      setPendingLawyers(pending.data?.lawyers || pending.data || [])
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }}
                                >
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Registered Lawyers list */}
                <Card>
                  <CardHeader>
                    <CardTitle>Registered Lawyers</CardTitle>
                    <CardDescription>Approved lawyers currently visible on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lawyers.length === 0 ? (
                      <div className="text-gray-400">No registered lawyers yet.</div>
                    ) : (
                      <div className="rounded-md border border-gray-800 overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-[180px]">Name</TableHead>
                              <TableHead className="min-w-[220px]">Email</TableHead>
                              <TableHead className="min-w-[120px]">Bar #</TableHead>
                              <TableHead className="min-w-[160px]">Specialization</TableHead>
                              <TableHead className="min-w-[120px]">Experience</TableHead>
                              <TableHead className="min-w-[200px]">Location</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {lawyers.slice(0, 10).map((l) => {
                              const loc = [l.city, l.state, l.country].filter(Boolean).join(', ')
                              return (
                                <TableRow key={l._id}>
                                  <TableCell className="font-medium">{l.fullName}</TableCell>
                                  <TableCell>{l.userId?.email}</TableCell>
                                  <TableCell>{l.barNumber}</TableCell>
                                  <TableCell>{l.specialization}</TableCell>
                                  <TableCell>{(l.yearsOfExperience ?? 0) + ' yrs'}</TableCell>
                                  <TableCell>{loc}</TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
  
            {activeSection === "users" && (
              <div>
                <h2 className="text-3xl font-bold">User Management</h2>
                <p className="text-gray-500 mt-1">Monitor and manage all registered clients</p>
  
                <div className="mt-6 overflow-x-auto border rounded-lg">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-sm">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                            {users.length === 0
                              ? "No registered users yet."
                              : "No users match your search."}
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => {
                          const name =
                            `${user.firstname || ""} ${user.lastname || ""}`.trim() ||
                            user.fullName ||
                            user.name ||
                            "User"
                          const type = (user.userType || user.type || "Client")
                            .toString()
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                          const status = user.status
                            ? user.status.replace(/\b\w/g, (l) => l.toUpperCase())
                            : "Active"
                          const joined = user.createdAt
                            ? new Date(user.createdAt).toISOString().split("T")[0]
                            : "—"
                          return (
                            <tr key={user._id || user.id || user.email} className="border-t text-sm">
                              <td className="px-4 py-2">{name}</td>
                              <td className="px-4 py-2">{user.email || "—"}</td>
                              <td className="px-4 py-2">{type}</td>
                              <td className="px-4 py-2">{status}</td>
                              <td className="px-4 py-2">{joined}</td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "lawyers" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Lawyer Verification</h2>
                <p className="text-gray-400">Review and approve lawyer registrations</p>

                {/* Pending Lawyer Registrations - dark, compact, with action buttons */}
                <Card className="border border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle>Pending Registrations</CardTitle>
                    <CardDescription>New lawyer registrations awaiting approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingLawyers.length === 0 ? (
                      <div className="text-gray-400">No pending registrations.</div>
                    ) : (
                      <div className="space-y-4">
                        {pendingLawyers.map((l) => {
                          const id = l.userId || l._id || l.id
                          const name =
                            l.fullName ||
                            (l.firstname && l.lastname ? `${l.firstname} ${l.lastname}`.trim() : l.name || "Lawyer")
                          const email = l.email || l.userId?.email || l.contactEmail || "N/A"
                          const specialization = l.specialization || "—"
                          const experience =
                            l.yearsOfExperience !== undefined && l.yearsOfExperience !== null
                              ? `${l.yearsOfExperience} years`
                              : l.experience || "—"
                          const location = [l.city, l.state, l.country].filter(Boolean).join(", ") || "—"
                          const documents = l.submittedDocuments ?? l.documents?.length ?? 0

                          return (
                            <div
                              key={id || email}
                              className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_auto] items-start gap-4 border border-gray-200 rounded-lg p-4 bg-white"
                            >
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900">{name}</div>
                                <div className="text-sm text-gray-500">{email}</div>
                                <div className="text-sm text-gray-500">Bar: {l.barNumber || "—"}</div>
                                <div className="text-xs text-gray-400">{location}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs uppercase text-gray-500">Specialization</div>
                                <div className="text-sm text-gray-800">{specialization}</div>
                                <div className="text-xs uppercase text-gray-500 mt-3">Documents</div>
                                <div className="text-sm text-gray-800">{documents}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs uppercase text-gray-500">Experience</div>
                                <div className="text-sm text-gray-800">{experience}</div>
                                <div className="text-xs uppercase text-gray-500 mt-3">Status</div>
                                <div className="text-sm text-amber-600 capitalize">{l.status || "Pending"}</div>
                              </div>
                              <div className="flex flex-col gap-2 lg:justify-center">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  disabled={!id}
                                  onClick={async () => {
                                    if (!id) return
                                    try {
                                      await api.post(`/v1/lawyers/${id}/approve`)
                                      const [approvedRes, pendingRes] = await Promise.all([
                                        api.get("/v1/lawyers?status=approved"),
                                        api.get("/v1/lawyers?status=pending"),
                                      ])
                                      setLawyers(approvedRes.data?.lawyers || approvedRes.data || [])
                                      setPendingLawyers(pendingRes.data?.lawyers || pendingRes.data || [])
                                    } catch (err) {
                                      console.error('Approval error:', err)
                                      // Extract error message properly
                                      const errorMsg = err?.data?.error || err?.data?.message || err?.message || "Failed to approve lawyer";
                                      const displayMsg = typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg);
                                      alert(displayMsg || "Failed to approve lawyer. Please check profile completeness.")
                                    }
                                  }}
                                >
                                  Approve & Create Profile
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={async () => {
                                    try {
                                      const id = l.userId || l._id || l.id
                                      if (!id) {
                                        alert('Error: User ID not found')
                                        return
                                      }
                                      setReviewLoading(true)
                                      setReviewModalOpen(true)
                                      // Use the correct endpoint
                                      const { data } = await api.get(`/v1/lawyers/${id}/review`)
                                      console.log('📋 Review data received (second button):', data)
                                      console.log('📋 Full data object:', JSON.stringify(data, null, 2))
                                      console.log('📋 Licenses:', data?.licenses, 'Type:', typeof data?.licenses, 'IsArray:', Array.isArray(data?.licenses), 'Count:', data?.licenses?.length)
                                      console.log('📋 Documents:', data?.documents, 'Type:', typeof data?.documents, 'IsArray:', Array.isArray(data?.documents), 'Count:', data?.documents?.length)
                                      
                                      // Ensure licenses and documents are arrays
                                      const normalizedData = {
                                        ...data,
                                        email: l.userId?.email || l.email || '',
                                        licenses: Array.isArray(data?.licenses) ? data.licenses : (data?.licenses ? [data.licenses] : []),
                                        documents: Array.isArray(data?.documents) ? data.documents : (data?.documents ? [data.documents] : []),
                                      }
                                      
                                      console.log('📋 Normalized data:', normalizedData)
                                      console.log('📋 Normalized licenses count:', normalizedData.licenses.length)
                                      console.log('📋 Normalized documents count:', normalizedData.documents.length)
                                      
                                      setReviewData(normalizedData)
                                    } catch (err) {
                                      console.error('Error fetching review data:', err)
                                      const errorMsg = err?.data?.error || err?.data?.message || err?.message || 'Failed to load documents'
                                      alert(`Error: ${errorMsg}`)
                                      setReviewModalOpen(false)
                                    } finally {
                                      setReviewLoading(false)
                                    }
                                  }}
                                >
                                  Review Documents
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Registered (approved) lawyers table */}
                <Card className="border border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle>Registered Lawyers</CardTitle>
                    <CardDescription>Approved lawyers visible on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lawyers.length === 0 ? (
                      <div className="text-gray-400">No registered lawyers yet.</div>
                    ) : (
                      <div className="rounded-md border border-gray-800 overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-[180px]">Name</TableHead>
                              <TableHead className="min-w-[220px]">Email</TableHead>
                              <TableHead className="min-w-[160px]">Specialization</TableHead>
                              <TableHead className="min-w-[120px]">Experience</TableHead>
                              <TableHead className="min-w-[200px]">Location</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {lawyers.slice(0, 10).map((l) => {
                              const loc = [l.city, l.state, l.country].filter(Boolean).join(', ')
                              return (
                                <TableRow key={l._id || l.id}>
                                  <TableCell className="font-medium">{l.fullName || l.name}</TableCell>
                                  <TableCell>{l.userId?.email || l.email}</TableCell>
                                  <TableCell>{l.specialization}</TableCell>
                                  <TableCell>{(l.yearsOfExperience ?? l.experience ?? 0) + ' yrs'}</TableCell>
                                  <TableCell>{loc}</TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "appointments" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Appointment Management</h2>
                <p className="text-gray-500">Oversee and manage all platform appointments</p>

                {/* Scheduled Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Appointments</CardTitle>
                    <CardDescription>Confirmed appointments scheduled without admin approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {scheduledAppointments.length === 0 ? (
                      <div className="text-gray-500 text-sm">No confirmed appointments yet.</div>
                    ) : (
                      <div className="rounded-md border overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Lawyer</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {scheduledAppointments.map((a) => (
                              <TableRow key={a._id}>
                                <TableCell>{getClientName(a)}</TableCell>
                                <TableCell>{getLawyerName(a)}</TableCell>
                                <TableCell>{getAppointmentType(a)}</TableCell>
                                <TableCell>{formatDate(a.appointmentDate)}</TableCell>
                                <TableCell>{formatTime(a.appointmentDate, a.timeSlot)}</TableCell>
                                <TableCell>{renderStatusBadge(a.status)}</TableCell>
                                <TableCell className="text-right space-x-2">
                                  <Button size="sm" variant="outline">View Details</Button>
                                  <Button size="sm" variant="outline">Reschedule</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* All Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Appointments</CardTitle>
                    <CardDescription>Complete appointment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {appointments.length === 0 ? (
                      <div className="text-gray-500 text-sm">No appointments have been booked yet.</div>
                    ) : (
                      <div className="rounded-md border overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Lawyer</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {appointments.map((a) => (
                              <TableRow key={a._id}>
                                <TableCell>{getClientName(a)}</TableCell>
                                <TableCell>{getLawyerName(a)}</TableCell>
                                <TableCell>{getAppointmentType(a)}</TableCell>
                                <TableCell>{formatDate(a.appointmentDate)}</TableCell>
                                <TableCell>{formatTime(a.appointmentDate, a.timeSlot)}</TableCell>
                                <TableCell>{renderStatusBadge(a.status)}</TableCell>
                                <TableCell className="text-right">
                                  <Button size="sm" variant="outline">View</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "reports" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold">Reports & Analytics</h2>
                  <p className="text-gray-500 mt-1">
                    Track booking volume, revenue trends, and specialization demand
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Appointments</CardTitle>
                      <CardDescription>All time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-semibold">{analytics.totalAppointments}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Paid Revenue</CardTitle>
                      <CardDescription>Captured payments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-semibold">{formatCurrency(analytics.paidRevenue)}</div>
                      <p className="text-sm text-gray-500 mt-1">
                        {analytics.paidCount} paid appointments
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Avg. Paid Fee</CardTitle>
                      <CardDescription>Per paid booking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-semibold">
                        {analytics.paidCount ? formatCurrency(Math.round(analytics.avgFee)) : "—"}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {appointments.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center text-gray-500">
                      No appointments yet. Bookings will appear here once clients schedule with lawyers.
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Booking Status</CardTitle>
                          <CardDescription>Distribution across the platform</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.entries(analytics.statusCounts).map(([status, count]) => {
                            const percentage = analytics.totalAppointments
                              ? Math.round((count / analytics.totalAppointments) * 100)
                              : 0
                            return (
                              <div key={status}>
                                <div className="flex justify-between text-sm text-gray-600 capitalize">
                                  <span>{status}</span>
                                  <span>
                                    {count} ({percentage}%)
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full mt-2">
                                  <div
                                    className={`h-full rounded-full ${
                                      status === "confirmed"
                                        ? "bg-green-500"
                                        : status === "completed"
                                        ? "bg-blue-500"
                                        : status === "pending"
                                        ? "bg-amber-500"
                                        : "bg-gray-400"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Payment Insights</CardTitle>
                          <CardDescription>Recent paid appointments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analytics.paidAppointments.length === 0 ? (
                            <div className="text-gray-500 text-sm">No paid appointments recorded yet.</div>
                          ) : (
                            <div className="space-y-3">
                              {analytics.paidAppointments.map((appt) => (
                                <div key={appt._id} className="border rounded-lg p-3">
                                  <div className="flex justify-between text-sm font-medium">
                                    <span>{getClientName(appt)}</span>
                                    <span className="text-gray-500">{formatCurrency(appt.consultationFee)}</span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                    <span>{getLawyerName(appt)}</span>
                                    <span>{formatDate(appt.appointmentDate || appt.createdAt)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Monthly Performance</CardTitle>
                          <CardDescription>Bookings & paid revenue (latest months)</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Month</TableHead>
                                  <TableHead>Bookings</TableHead>
                                  <TableHead>Confirmed</TableHead>
                                  <TableHead>Revenue</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {analytics.monthly.slice(0, 6).map((row) => (
                                  <TableRow key={row.key}>
                                    <TableCell>{formatMonthLabel(row.date)}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>{row.confirmed}</TableCell>
                                    <TableCell>{formatCurrency(row.revenue)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Top Case Types</CardTitle>
                          <CardDescription>Most requested legal services</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {analytics.topSpecializations.length === 0 ? (
                            <div className="text-gray-500 text-sm">No specialization data yet.</div>
                          ) : (
                            analytics.topSpecializations.map((item) => (
                              <div key={item.name}>
                                <div className="flex justify-between text-sm font-medium">
                                  <span>{item.name}</span>
                                  <span>
                                    {item.count} ({item.percentage}%)
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full mt-2">
                                  <div
                                    className="h-full rounded-full bg-amber-600"
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                              </div>
                            ))
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeSection === "disputes" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Financial Disputes</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Open Disputes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {disputeRecords.length === 0 ? (
                      <div className="text-gray-500 text-sm">No payment disputes detected.</div>
                    ) : (
                      <div className="space-y-3">
                        {disputeRecords.map((d) => (
                          <div key={d.id} className="border rounded-lg p-4 bg-white shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {d.client} <span className="text-gray-400 text-sm">vs</span> {d.lawyer}
                                </div>
                                <div className="text-sm text-gray-500">{d.reason}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-amber-700">{formatCurrency(d.amount)}</div>
                                <div className="text-xs text-gray-400">{formatDate(d.createdAt)}</div>
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                              <span
                                className={`px-2 py-0.5 rounded-full font-medium ${
                                  d.disputeStatus === "Refunded"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {d.disputeStatus}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                Payment: {d.paymentStatus}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                                Case: {d.appointmentStatus}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "logs" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold">System Logs</h2>
                  <p className="text-gray-500 mt-1">Monitor system activity and security audit trails</p>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest system events and actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length === 0 ? (
                      <div className="text-gray-500 text-sm">No activity recorded yet.</div>
                    ) : (
                      <div className="rounded-md border overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Action</TableHead>
                              <TableHead>User</TableHead>
                              <TableHead>Timestamp</TableHead>
                              <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentActivity.map((log, idx) => (
                              <TableRow key={`${log.action}-${log.timestamp}-${idx}`}>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.user}</TableCell>
                                <TableCell>{formatDate(log.timestamp)}</TableCell>
                                <TableCell className="text-right">
                                  {log.status?.toLowerCase() === "failed" ? (
                                    <span className="inline-flex items-center rounded-full bg-red-600/15 text-red-600 text-xs px-2 py-0.5">Failed</span>
                                  ) : log.status?.toLowerCase() === "refunded" ? (
                                    <span className="inline-flex items-center rounded-full bg-blue-600/15 text-blue-600 text-xs px-2 py-0.5">Refunded</span>
                                  ) : log.status?.toLowerCase() === "pending" ? (
                                      <span className="inline-flex items-center rounded-full bg-amber-500/15 text-amber-700 text-xs px-2 py-0.5">Pending</span>
                                  ) : (
                                    <span className="inline-flex items-center rounded-full bg-green-600/15 text-green-600 text-xs px-2 py-0.5">
                                      {log.status || "Success"}
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Security Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Failed Login Attempts</CardTitle>
                      <CardDescription>Last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">{failedLoginAttempts}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Active Sessions</CardTitle>
                      <CardDescription>Currently online</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">{activeSessions}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">System Uptime</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">{systemUptime}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* Document Review Modal */}
        {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Review Documents</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReviewModalOpen(false)
                  setReviewData(null)
                }}
              >
                Close
              </Button>
            </div>
            
            <div className="overflow-y-auto p-6 flex-1">
              {reviewLoading ? (
                <div className="text-center py-8">Loading documents...</div>
              ) : reviewData ? (
                <div className="space-y-6">
                  {/* Debug Info - Remove in production */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs">
                      <strong>Debug Info:</strong> Licenses: {reviewData.licenses?.length || 0}, Documents: {reviewData.documents?.length || 0}
                      <br />
                      Licenses type: {typeof reviewData.licenses}, IsArray: {Array.isArray(reviewData.licenses) ? 'Yes' : 'No'}
                      <br />
                      Documents type: {typeof reviewData.documents}, IsArray: {Array.isArray(reviewData.documents) ? 'Yes' : 'No'}
                    </div>
                  )}
                  {/* Lawyer Information */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{reviewData.fullName || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{reviewData.email || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bar Number</div>
                      <div className="font-medium">{reviewData.barNumber || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Specialization</div>
                      <div className="font-medium">{reviewData.specialization || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Experience</div>
                      <div className="font-medium">{reviewData.yearsOfExperience || 0} years</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">City</div>
                      <div className="font-medium">{reviewData.city || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">CNIC Number</div>
                      <div className="font-medium">{reviewData.cnicNumber || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Firm Name</div>
                      <div className="font-medium">{reviewData.firmName || 'N/A'}</div>
                    </div>
                  </div>
                  
                  {/* Licenses Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Licenses ({(reviewData.licenses || []).length})
                      {reviewData.licenses && reviewData.licenses.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          - Click "View" to see full document
                        </span>
                      )}
                    </h3>
                    {reviewData.licenses && Array.isArray(reviewData.licenses) && reviewData.licenses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviewData.licenses.map((license, index) => {
                          // Handle both string and object formats
                          const licenseUrl = typeof license === 'string' ? license : (license?.url || '');
                          const licenseName = typeof license === 'object' ? (license?.name || `License ${index + 1}`) : `License ${index + 1}`;
                          
                          if (!licenseUrl) {
                            return (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="text-sm text-gray-500">No URL provided</div>
                              </div>
                            );
                          }
                          
                          const isImage = licenseUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                          
                          return (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="space-y-3">
                                <div className="text-sm font-semibold text-gray-700">{licenseName}</div>
                                
                                {/* Preview */}
                                <div className="relative w-full h-48 border rounded bg-gray-50 overflow-hidden">
                                  {isImage ? (
                                    <img
                                      src={licenseUrl}
                                      alt={licenseName}
                                      className="w-full h-full object-contain cursor-pointer"
                                      onClick={() => {
                                        setViewerUrl(licenseUrl);
                                        setViewerName(licenseName);
                                        setViewerType('image');
                                        setViewerOpen(true);
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                      }}
                                    />
                                  ) : null}
                                  <div
                                    className={`w-full h-full flex flex-col items-center justify-center ${isImage ? 'hidden' : ''}`}
                                  >
                                    <FileText className="h-16 w-16 text-gray-400 mb-2" />
                                    <span className="text-xs text-gray-500">Document Preview</span>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={() => {
                                      setViewerUrl(licenseUrl);
                                      setViewerName(licenseName);
                                      setViewerType(isImage ? 'image' : 'document');
                                      setViewerOpen(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = licenseUrl;
                                      link.download = licenseName || 'license';
                                      link.target = '_blank';
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                  >
                                    <Download className="h-4 w-4" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">No licenses submitted</div>
                    )}
                  </div>
                  
                  {/* Documents Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Documents ({(reviewData.documents || []).length})
                      {reviewData.documents && reviewData.documents.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          - Click "View" to see full document
                        </span>
                      )}
                    </h3>
                    {reviewData.documents && Array.isArray(reviewData.documents) && reviewData.documents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviewData.documents.map((doc, index) => {
                          const docUrl = typeof doc === 'string' ? doc : (doc?.url || '');
                          const docName = typeof doc === 'object' ? (doc?.name || `Document ${index + 1}`) : `Document ${index + 1}`;
                          const isImage = docUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                          
                          if (!docUrl) {
                            return (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="text-sm text-gray-500">Invalid document format</div>
                              </div>
                            );
                          }
                          
                          return (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="space-y-3">
                                <div className="text-sm font-semibold text-gray-700">{docName}</div>
                                
                                {/* Preview */}
                                <div className="relative w-full h-48 border rounded bg-gray-50 overflow-hidden">
                                  {isImage ? (
                                    <img
                                      src={docUrl}
                                      alt={docName}
                                      className="w-full h-full object-contain cursor-pointer"
                                      onClick={() => {
                                        setViewerUrl(docUrl);
                                        setViewerName(docName);
                                        setViewerType('image');
                                        setViewerOpen(true);
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                      }}
                                    />
                                  ) : null}
                                  <div
                                    className={`w-full h-full flex flex-col items-center justify-center ${isImage ? 'hidden' : ''}`}
                                  >
                                    <FileText className="h-16 w-16 text-gray-400 mb-2" />
                                    <span className="text-xs text-gray-500">Document Preview</span>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={() => {
                                      setViewerUrl(docUrl);
                                      setViewerName(docName);
                                      setViewerType(isImage ? 'image' : 'document');
                                      setViewerOpen(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = docUrl;
                                      link.download = docName || 'document';
                                      link.target = '_blank';
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                  >
                                    <Download className="h-4 w-4" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">No documents submitted</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No data available</div>
              )}
            </div>
          </div>
        </div>
        )}
        
        {/* Document Viewer Modal */}
        {viewerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">{viewerName}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = viewerUrl;
                      link.download = viewerName || 'document';
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setViewerOpen(false);
                      setViewerUrl('');
                      setViewerName('');
                      setViewerType('');
                    }}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Close
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center">
                {viewerType === 'image' ? (
                  <img
                    src={viewerUrl}
                    alt={viewerName}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <iframe
                    src={viewerUrl}
                    className="w-full h-[80vh] border rounded-lg bg-white"
                    title={viewerName}
                  />
                )}
                <div className="hidden flex-col items-center justify-center text-gray-500">
                  <FileText className="h-24 w-24 mb-4" />
                  <p className="text-lg">Unable to display document</p>
                  <p className="text-sm mt-2">Please use the download button to view the file</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
