 import AuthProvider from "@/app/Context/AuthProvider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <AuthProvider>
      <div className="min-h-screen flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white p-5">
          <h1 className="text-2xl font-bold mb-6">
            Admin Panel
          </h1>

          <nav className="flex flex-col gap-4">
            <a href="/admin">Dashboard</a>
            <a href="/admin/users">Users</a>
            <a href="/admin/products">Products</a>
          </nav>
        </aside>






        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>

      </div>
    </AuthProvider>
  )
}