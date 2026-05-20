"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Trash2,
  Search,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

function Avatar({ name }) {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
  ];
  const color = colors[(name?.charCodeAt(0) ?? 0) % colors.length];
  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-semibold text-sm shrink-0 ${color}`}
    >
      {name?.[0]?.toUpperCase() ?? "?"}
    </span>
  );
}

// ─── Chip

function Chip({ label, variant = "neutral", pill = false }) {
  const styles = {
    success: "bg-emerald-100 text-emerald-800",
    danger: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center px-4 py-2 text-xs font-semibold
        ${pill ? "rounded-full" : "rounded-lg"} ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

// ─── Sort icon helper
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field)
    return <ChevronsUpDown size={13} className="text-gray-400 ml-0.5" />;
  return sortDir === "asc" ? (
    <ChevronUp size={13} className="text-violet-500 ml-0.5" />
  ) : (
    <ChevronDown size={13} className="text-violet-500 ml-0.5" />
  );
}

// ─── Main component
export default function UsersTable() 
{
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [sortOrder, setSortOrder] = useState("asc");

  const [users, setUsers] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const menuRef = useRef(null);

  // Close menu on outside click

  useEffect(() => {
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ── Fetch users ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/get_all_users");
      const data = await res.json();
      setUsers(data.users || data);
    } catch {
      setUsers([]);
    }
  };

  // ── Delete 
  // user ────
  // 
  
  const handleDelete = async (id) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    
    //  Check if response is JSON before parsing
    const contentType = res.headers.get("content-type");

    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text(); // fallback for HTML errors
      throw new Error(text || "Unexpected server response");
    }

    if (!res.ok) {
      throw new Error(data?.message || "Failed to delete user");
    }

    // Success UI Update
    setUsers((prev) => prev.filter((item) => item._id !== id));

    console.log("Deleted successfully:", data.message);
  } 
  catch (error) {
    console.error("Delete error:", error.message);

    // optional: show UI toast
    // toast.error(error.message || "Something went wrong");
  }
};

  // ── Filter + Search + Sort ───────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    let data = [...users];

    data = data.filter((user) =>
      (user?.name ?? "").toLowerCase().includes(search.toLowerCase()),
    );

    if (roleFilter !== "All") {
      data = data.filter((user) => user.role === roleFilter);
    }

    data.sort((a, b) => {
      const nameA = (a?.name ?? "").toLowerCase();
      const nameB = (b?.name ?? "").toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    return data;
  }, [users, search, roleFilter, sortOrder]);

  // ── Pagination ───────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    page * pageSize,
    page * pageSize + pageSize,
  );

  // Reset to first page when filters change
  useEffect(() => {
    setPage(0);
  }, [search, roleFilter, sortOrder, pageSize]);

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-[95%] ml-1 rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Users Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all system users
          </p>
        </div>

        {/* 3-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={20} className="text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-3 flex flex-col gap-2">
              {/* Search */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                />
              </div>

              {/* Role filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">Super Admin</option>
                <option value="User">User</option>
              </select>

              {/* Sort */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
              >
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Username</th>
              <th className="px-6 py-3 font-medium">Phone No</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Created At</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((row) => {
                const isRole1 = row.role === 1;
                const isActive = row.status === "Active";

                return (
                  <tr
                    key={row.id ?? row._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* User (avatar + name + email) */}
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={row.name} />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {row.name}
                          </p>
                          <p className="text-xs text-gray-500">{row.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="px-6 py-3 font-medium text-gray-700">
                      {row.username}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-3 text-gray-600">
                      {row.Phone || "03001556660"}
                    </td>

                    {/* Role chip */}
                    <td className="px-6 py-3 text-black  ">
                      <Chip
                        label={isRole1 ? 1 : 2}
                        variant={isRole1 ? "success" : "danger"}
                        
                      />
                    </td>

                    {/* Status chip */}
                    <td className="px-6 py-3 text-black  ">
                      <Chip
                        label={row.status || "InActive"}
                        variant={isActive ? "success" : "danger"}
                        pill
                      />
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-3 text-gray-600">{row.createdAt}</td>

                    {/* Actions */}
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDelete(row._id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer  "
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ─────────────────────────────────────────────────── */}
      <div className="px-6 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50">
        {/* Page-size picker */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-2 py-1 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Page info + controls */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            {filteredUsers.length === 0
              ? "0–0 of 0"
              : `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, filteredUsers.length)} of ${filteredUsers.length}`}
          </span>
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white
              disabled:opacity-40 hover:bg-gray-100 transition-colors"
          >
            ‹
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white
              disabled:opacity-40 hover:bg-gray-100 transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
