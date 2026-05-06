"use client";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";





export default function ProfileAvatar() {

const { data: session } = useSession();

const [user, setUser] = useState(null);


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


  return (
    <div className="relative inline-block group">
      
  
      <button className="w-10 h-10 rounded-full bg-[#352C4D] hover:bg-[#4B3B6B] flex items-center justify-center text-white transition">
        <Image
      src={user?.profileImage || "/default-avatar.png"}
      width={50}
      height={50}
      alt="Profile Image"
      className="rounded-full" />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full pt-2 w-40 hidden group-hover:block z-50">
        <div className="bg-[#1E1830] border border-gray-700 rounded-xl shadow-lg p-2">


        <p className="text-white">username: {user?.name || session?.user?.name}</p>

          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-[#352C4D] transition"
          >
            Sign Out Hello ....

          </button>

        </div>
      </div>

    </div>
  );
}