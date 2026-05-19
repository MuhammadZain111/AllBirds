"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import CompleteProfile from "./CompleteProfile";

function ProfilePage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const activeTab = Number(searchParams.get("tab")) || 1;

  // LOADING STATE
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <p className="text-black">Access denied</p>;
  }

  // AUTHENTICATED

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="w-64 text-white">
        <Sidebar />
      </aside>

      <main className="flex flex-col flex-1 items-center justify-start pl-3">
        {/* Header */}
        {/* <Header /> */}

        {/* <WelcomeSection adminName={session?.user?.name || "Admin"} /> */}

        {activeTab === 1 && <CompleteProfile />}

        {/* console.log(session) */}
      </main>
    </div>
  );
}

export default ProfilePage;
