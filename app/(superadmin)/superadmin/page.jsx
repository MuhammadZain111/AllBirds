'use client'

import React from 'react'

import Sidebar from "../components/Sidebar"

import Header from "../components/Header"

import {useSession} from "next-auth/react";



function page() {



   const  { data :session,status } = useSession();


 if (status === 'loading') {
  return <p>Loading...</p>; // Or a spinner
}

if (status === 'authenticated') {
  // Session is available, you can access session.user
  console.log(session.user);
} 

// else {
//   // User is not authenticated
//   return <p className="  text-black ">Access denied</p>;
// }




  return (
    <div  className="min-h-screen flex bg-[#ede9e2]"  >

     <aside className="w-64  text-white">
     <Sidebar />
      </aside>
      
      <main className="flex-1">
      <Header />
      </main>


    </div>
  )
}

export default page
