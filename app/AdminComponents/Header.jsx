"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import ProfileDropdown from "./ProfileDrop";

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
    <div className="bg-white w-full px-4 ">
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
        {status === "loading"
          ? null
          : session && (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="w-10 h-10 rounded-full bg-[#352C4D] flex items-center justify-center text-white transition overflow-hidden cursor-pointer  "
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
                  <ProfileDropdown
                    Opendropdown={dropdown}
                    setOpenDropdown={setDropdown}
                  />
                )}
              </div>
            )}
      </div>
    </div>
  );
}

export default Header;
