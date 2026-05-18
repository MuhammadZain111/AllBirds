"use client";

import React from "react";
import Sidebar from "../../AdminComponents/Sidebar";
import Header from "../../AdminComponents/Header";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import AddEmployee from "../../AdminComponents/AddProduct";
import AddProduct from "../../AdminComponents/AddProduct";
import WelcomeSection from "../../AdminComponents/WelcomeSection";
import AllProducts from "../../AdminComponents/AllProducts";

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
    <div className="min-h-screen flex  w-full bg-white">
      <aside className="w-[19%] text-white">
        <Sidebar />
      </aside>

      <main className="flex-1 w-[80%] text-white ">
        <Header />
        <WelcomeSection adminName={session?.user?.name || "Admin"} />
        <p className="text-black">{activeTab}</p>
        {/* <p className="text-black">Role {session?.user?.role}</p> */}

        {activeTab === 3 && session?.user?.role === 2 && <AddProduct />}

        {activeTab === 4 && session?.user?.role === 2 && <AllProducts />}
      </main>
    </div>
  );
}

export default Page;
