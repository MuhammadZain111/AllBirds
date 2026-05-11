"use client";

import React from "react";
import Sidebar from "../../AdminComponents/Sidebar";
import Header from "../../AdminComponents/Header";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import AddEmployee from "../components/AddProduct";
import AddProduct from "../components/AddProduct";

function Page() {
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();

  const activeTab = Number(searchParams.get("tab")) || 1;

  const role = session?.user?.role;

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

      <main className="flex-1">
        <Header />
        <p className="text-black">{activeTab}</p>
        <p className="text-black"> here the admin wikl be laoded</p>
        <p className="text-black">Role {session?.user?.role}</p>
        {activeTab === 3 && session?.user?.role === 2 && <AddProduct />}
      </main>
    </div>
  );
}

export default Page;
