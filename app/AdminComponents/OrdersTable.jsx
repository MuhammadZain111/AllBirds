"use client";

export default function OrdersTable({ orders }) {
  return (
    <section className="rounded-lg border bg-white p-4">
      <h2 className="mb-3 text-lg font-medium text-black">Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Specialization</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.fullName}</td>
                <td className="py-2">{order.email}</td>
                <td className="py-2">{order.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
