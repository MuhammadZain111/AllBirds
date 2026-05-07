'use client'

import React from 'react'
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import {useSession} from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AddEmployee from '../components/AddEmployee';



function Page() {


  const  { data :session,status } = useSession();


 if (status === 'loading') {
  return <p>Loading...</p>; 
}

if (status === 'authenticated') {
  // Session is available, You can access session.user
  console.log(session.user);
} 

// else {
//   // User is not authenticated
//   return <p className="  text-black ">Access denied</p>;
// }

const router = useRouter();

const searchParams = useSearchParams();

const activeTab = Number(searchParams.get("tab")) || 1;


  return (
    <div  className="min-h-screen flex bg-[#ede9e2]"  >

     <aside className="w-64  text-white">
     <Sidebar />
      </aside>
    
      
      <main className="flex-1">
      <Header />
      {activeTab === 1 && <AddEmployee />}


      </main>


    </div>
  )
}



export default Page
