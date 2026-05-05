
import React from 'react'

import Sidebar from "../components/Sidebar"

import Header from "../components/Header"




function page() {

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
