'use client';

export default function DashboardHeader({ search, onSearchChange }) {
  return (
    <header className="rounded-lg border bg-white p-4">
      <h1 className="text-2xl font-semibold text-black">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">Manage users, Products, and admin activity.</p>
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="mt-4 w-full rounded-md border px-3 py-2 text-sm"
        placeholder="Search users or lawyers"
      />
    </header>
  );
}
