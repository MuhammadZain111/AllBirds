"use client";
import { useState } from "react";
import {useSession } from "next-auth/react";



import {
  User,
  Settings,
  CircleHelp,
  LogOut}
  from "lucide-react"


export default function ProfileDropdown() {


 const  { data :session,status } = useSession();




  return (
    <div className="min-h-screen bg-gray-100 p-6">

    
      <div className="mt-8 w-full max-w-xl rounded-[32px] border border-gray-200 bg-white shadow-sm p-8">
        
    
        <div>
          <h2 className="text-2xl font-semibold text-slate-700">
            Musharof Chowdhury
          </h2>

          <p className="mt-2 text-1xl text-slate-500">
            randomuser@pimjo.com
          </p>
        </div>

        {/* Menu Items */}
        <div className="mt-10 space-y-8">

          <button className="flex items-center gap-5 text-slate-700 hover:text-blue-600 transition">
            <User className="w-4 h-1 text-slate-500" />
            <span className="text-3xl font-medium">Edit profile</span>
          </button>

          <button className="flex items-center gap-5 text-slate-700 hover:text-blue-600 transition">
            <Settings className="w-4 h-1 text-slate-500" />
            <span className="text-3xl font-medium">Account settings</span>
          </button>

          <button className="flex items-center gap-5 text-slate-700 hover:text-blue-600 transition">
            <CircleHelp className="w-4 h-1 text-slate-500" />
            <span className="text-3xl font-medium">Support Premium</span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200"></div>


{session && (
  <>
  
    <button className="flex items-center gap-5 text-slate-700 hover:text-red-500 transition">
      <LogOut className="w-10 h-10 text-slate-500" />
      <span className="text-3xl font-medium">
        Sign out
      </span>
    </button>
  </>
)}

      </div>
    </div>
  );
}