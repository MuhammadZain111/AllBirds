'use client';

import { useMemo, useState } from "react";
import DashboardHeader from "./admin-dashboard/DashboardHeader";
import DashboardTabs from "./admin-dashboard/DashboardTabs";
import DashboardStats from "./admin-dashboard/DashboardStats";
import UsersTable from "./admin-dashboard/UsersTable";
import LawyersTable from "./admin-dashboard/LawyersTable";

const mockUsers = [
  { id: "u1", name: "Ali Khan", email: "ali@example.com", type: "Client", status: "Active" },
  { id: "u2", name: "Sara Noor", email: "sara@example.com", type: "Lawyer", status: "Pending" },
  { id: "u3", name: "Hamza Tariq", email: "hamza@example.com", type: "Client", status: "Active" },
];

const mockLawyers = [
  { id: "l1", fullName: "Ayesha Malik", email: "ayesha@law.com", specialization: "Corporate", yearsOfExperience: 7 },
  { id: "l2", fullName: "Omar Riaz", email: "omar@law.com", specialization: "Family", yearsOfExperience: 5 },
];

export default function AdminDashboard() {
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

  const filteredLawyers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockLawyers;
    return mockLawyers.filter((l) => {
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.specialization.toLowerCase().includes(q)
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
            { label: "Registered Lawyers", value: String(mockLawyers.length) },
            { label: "Pending Reviews", value: "1" },
            { label: "Appointments", value: "12" },
          ]}
        />
      )}

      {activeTab === "users" && <UsersTable users={filteredUsers} />}

      {activeTab === "lawyers" && <LawyersTable lawyers={filteredLawyers} />}
    </section>
  );
}
