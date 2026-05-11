import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Settings, CircleHelp } from "lucide-react";
import { signOut } from "next-auth/react";


function ProfileDropdown({ Opendropdown, setOpenDropdown }) {
  
  const dropdownRef = useRef();


  //  Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setOpenDropdown]);

  //  Close on ESC key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [setOpenDropdown]);

  if (!Opendropdown) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-16 right-0 w-[350px] rounded-3xl border border-gray-200 bg-white shadow-lg p-6 z-50"
    >
      {/* User Info */}
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
          <span className="text-lg font-medium">Edit profile</span>
        </button>

        <Link
          href="/profile"
          className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition"
        >
          <Settings className="w-5 h-5" />
          <span className="text-lg font-medium">Account settings</span>
        </Link>

        <button className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition">
          <CircleHelp className="w-5 h-5" />
          <span className="text-lg font-medium">Support</span>
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Logout */}
      <button
        className="cursor-pointer text-black hover:text-red-600 transition"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default ProfileDropdown;