"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import SideDrawer from "./SideDrawer"
import BottomDrawer from "./BottomDrawer"


function Navbar() {

  const [open, setOpen] = useState(false);     
   
  const [drawer, setDrawer] = useState(false);  
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md rounded-sm flex justify-between  flex justify-between  ">

        <div className="md:w-full   px-4  ">

         
          <div className="flex items-center h-16">

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="text-2xl"
              >
                {open ? "✖" : "☰"}
              </button>
            </div>

            <div className="flex justify-start  text-center md:text-left">
              <Link href="/" className="text-xl font-bold text-blue-600">
             <Image src="/icons/allbird.svg" width={90} height={50} alt="img" />
              </Link>
            </div>

           <div className="flex flex-1 md:gap-8  justify-center items-center text-black   ">
            <Link onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                backgroundColor: isHovered ? "blue" : "gray",
                padding: "20px",
               }} href="/men">Men</Link>
              <Link href="/women">Women</Link>
              <Link href="/sale">Sale</Link>
            </div>

{/* Here is Lower navars Options  */}

{isHovered && (
<>
<div className="fixed inset-0 bg-black/50 z-40" onChange={() => setIsHovered(false)} />
<BottomDrawer> </BottomDrawer>  
</>
)}




          
          <div className="hidden md:flex justify-between py-3">

            <ul className="space-x-6 flex text-black">
              
              <li><Link href="/">About</Link></li>

              <li><Link href="/about">Rerun</Link></li>
              
              <Link className="cursor-pointer" href="/contact">
              <Image src="/icons/search.svg" width={30} height={30} alt="seaarchIcon" />
              </Link>
        
              <Link className="cursor-pointer"  href="/contact">
              <Image src="/icons/login.svg" width={30} height={30} alt="login" />
              </Link>

             <Link className="cursor-pointer"   href="/contact">help

              </Link>

              <button
                onClick={() => setDrawer(true)}
                className="px-3 py-1 text-white rounded cursor-pointer" 
              >
               <Image src="/icons/cart.svg" width={30} height={30} alt="img" />     
              </button>

            </ul>
          </div>

         
          {open && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
              <Link href="/" className="block py-2">About</Link>
              <Link href="/about" className="block py-2">ReRun</Link>
              <Link href="/services" className="block py-2">Services</Link>
              <Link href="/contact" className="block py-2">Contact</Link>
              <Link href="/men" className="block py-2">Men</Link>
              <Link href="/women" className="block py-2">Women</Link>
              <Link href="/sale" className="block py-2">Sale</Link>
            </div>
          )}
        </div>

        {/* ================= DRAWER ================= */}


     
        {drawer && ( 
         <>
         <div
          className="fixed inset-0 bg-black/50 z-40"
               onClick={() => setDrawer(false)}
               />

         <SideDrawer open={drawer}  onClose={() => setDrawer(false)}> </SideDrawer>  
    
         </>
     
   )}


     {/* <SideDrawer isOpen={isSideOpen} position="left-0 top-0 h-full w-64">
      Side Content
      </SideDrawer> */} 
        

        </div>
      </nav>

    </>
  );
}

export default Navbar;