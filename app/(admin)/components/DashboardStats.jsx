'use client';

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      {stats.map((item) => (
        <article key={item.label} className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">{item.label}</p>
          <p className="mt-1 text-2xl font-semibold text-black">{item.value}</p>
        </article>
      ))}
    </div>
  );
}
