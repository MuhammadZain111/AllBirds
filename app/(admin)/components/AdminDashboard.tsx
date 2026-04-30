'use client';

import { useMemo, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardTabs from "./DashboardTabs";
import DashboardStats from "./DashboardStats";
import UsersTable from "./UsersTable";
import OrdersTable from "./OrdersTable";
import { useSession } from "next-auth/react"



const mockUsers = [
  { id: "u1", name: "Ali Khan", email: "ali@example.com", type: "use", status: "Active" },
  { id: "u2", name: "Sara Noor", email: "sara@example.com", type: "user", status: "Pending" },
  { id: "u3", name: "Hamza Tariq", email: "hamza@example.com", type: "user", status: "Active" },
];




const mockOrders = [
  { id: "l1", Name: "Ayesha Malik", email: "ayesha@law.com", specialization: "Corporate", yearsOfExperience: 7 },
  { id: "l2", Name: "Omar Riaz", email: "omar@law.com", specialization: "Family", yearsOfExperience: 5 },
];






export default function AdminDashboard() {


const session=useSession();


// const role = session?.user?.role



// if (session.user.role === 1) {
//   show Admin Dashboard
// } else if (session.user.role === 2) {
//   show Sub Admin Dashboard
// } else {
//   show User Dashboard
// // }


// useEffect(() => {
//   if (session?.user.role === 1) {
//     fetch("/api/admin/stats")
//   }

//   if (session?.user.role === 2) {
//     fetch("/api/subadmin/tasks")
//   }

//   if (session?.user.role === 3) {
//     fetch("/api/user/profile")
//   }
// }, [session])







  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockUsers;
    return mockUsers.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.type.toLowerCase().includes(q)
      );
    });
  }, [search]);


  //Here is the Orders Table ...

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockUsers;
    return mockOrders.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.type.toLowerCase().includes(q)
      );
    });
  }, [search]);














  

  return (
    <section className="space-y-6">
      <DashboardHeader search={search} onSearchChange={setSearch} />

      <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <DashboardStats
          stats={[
            { label: "Total Users", value: String(mockUsers.length) },
            { label: "Pending Orders", value: "1" },
            { label: "Completed Orders", value: "12" },
          ]}
        />
      )}

      {activeTab === "users" && <UsersTable users={filteredUsers} />}

      {activeTab === "Orders" && <OrdersTable orders={filteredOrders} />}
    </section>
  );
}
