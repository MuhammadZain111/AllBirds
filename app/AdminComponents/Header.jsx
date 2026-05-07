"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

import { Moon, Bell, User, Settings, CircleHelp, LogOut } from "lucide-react";

function Header() {
  const [dropdown, setDropdown] = useState(false);

  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);

  if (status === "loading") {
    return <p>Loading...</p>; // Or a spinner
  }

  if (status === "authenticated") {
    // Session is available, you can access session.user
    console.log(session.user);
  } else {
    // User is not authenticated
    return <p className="  text-black ">Access denied</p>;

    useEffect(() => {
      const fetchUser = async () => {
        const res = await fetch("/api/get-user");
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      };

      fetchUser();
    }, []);
  }

  return (
    <div className="bg-white w-full  ">
      {/* Top Header */}
      <div className="w-full flex items-center justify-end gap-4 relative">
        {/* Dark Mode */}
        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
          <Moon className="w-5 h-5 text-slate-500" />
        </button>

        {/* Notification */}
        <div className="relative">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
            <Bell className="w-5 h-5 text-slate-500" />
          </button>

          <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full border-2 border-white"></span>
        </div>

        {/* Profile Button */}
        <button
          onClick={() => setDropdown(!dropdown)}
          className="w-10 h-10 rounded-full bg-[#352C4D] flex items-center justify-center text-white transition overflow-hidden cursor-pointer"
        >
          <Image
            src={user?.profileImage || "/default-avatar.png"}
            width={50}
            height={40}
            alt="Profile Image"
            className="rounded-full object-cover"
          />
        </button>

        {dropdown && (
          <div className="absolute top-16 right-0 w-[350px] rounded-3xl border border-gray-200 bg-white shadow-lg p-6 z-50">
            <div>
              <h2 className="text-xl font-semibold text-slate-700">
                Musharof Chowdhury
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                randomuser@pimjo.com
              </p>
            </div>

            {/* Menu Items */}
            <div className="mt-8 space-y-6">
              <button className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition">
                <User className="w-5 h-5" />
                <span className="text-lg font-medium">Edit profile</span>
              </button>

              <button className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition">
                <Settings className="w-5 h-5" />
                <span className="text-lg font-medium">Account settings</span>
              </button>

              <button className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition">
                <CircleHelp className="w-5 h-5" />
                <span className="text-lg font-medium">Support</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>

            {session && (
              <>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-4 text-slate-700 hover:text-red-500 transition cursor-pointer "
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
