"use client";

import { signOut } from "next-auth/react";
import { User } from "lucide-react";

export default function ProfileAvatar() {
  return (
    <div className="relative inline-block group">
      
      {/* Avatar */}
      <button className="w-10 h-10 rounded-full bg-[#352C4D] hover:bg-[#4B3B6B] flex items-center justify-center text-white transition">
        <User size={20} />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full pt-2 w-40 hidden group-hover:block z-50">
        <div className="bg-[#1E1830] border border-gray-700 rounded-xl shadow-lg p-2">


        <p className="text white">username </p>



          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-[#352C4D] transition"
          >
            Sign Out
          </button>

        </div>
      </div>

    </div>
  );
}