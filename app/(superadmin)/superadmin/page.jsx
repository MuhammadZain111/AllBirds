"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import AddEmployee from "../../AdminComponents/AddEmployee";
import Header from "../../AdminComponents/Header";
import Sidebar from "../../AdminComponents/Sidebar";
import AllUsers from "../../AdminComponents/AllUsers";
import WelcomeSection from "../../AdminComponents/WelcomeSection";
import AllProducts from "../../AdminComponents/AllProducts";
import AdminProfile from "../../AdminComponents/AdminProfile";

function Page() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const activeTab = Number(searchParams.get("tab")) || 1;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    console.log(session?.user);
  }

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="w-64 text-white">
        <Sidebar />
      </aside>

      <main className="flex flex-col flex-1 items-center justify-start pl-3 ">
        <Header />
        <WelcomeSection adminName={session?.user?.name || "Admin"} />

        {activeTab === 1 && <AllUsers />}
        {activeTab === 2 && <AllUsers />}
        {activeTab === 3 && <AddEmployee />}
        {activeTab === 4 && <AllProducts />}
        {activeTab === 5 && <AdminProfile />}
      </main>
    </div>
  );
}

export default Page;
