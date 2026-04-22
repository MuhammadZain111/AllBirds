"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SideDrawer from './SideDrawer'
import BottomDrawer from './BottomDrawer'





export default function Navbar() {
  const [open, setOpen] = useState(false);
  
  const [drawer, setDrawer] = useState(false);

  

  const [bottomOpen, setBottomOpen] = useState(false);

  return (
    <>
     
      <nav className="fixed top-2 mt-3 left-0 w-full md:w-[99vw] z-[60] bg-white shadow-md rounded-2xl ">
        
        <div className="flex items-center justify-between h-16 px-4">

          {/* ===== LEFT (Hamburger + Logo) ===== */}
          <div className="flex items-center gap-4">

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl text-black"
            >
              {open ? "✖" : "☰"}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/allbird.svg"
                width={90}
                height={50}
                alt="logo"
              />
            </Link>
          </div>

          {/* ===== CENTER (Desktop Links) ===== */}
          <div className="hidden md:flex gap-8 text-black font-medium">
          
          <button className="cursor-pointer" onClick={() => setBottomOpen(!bottomOpen)} href="/men">Men</button>

            <Link href="/women">Women</Link>
            <Link href="/sale">Sale</Link>
          </div>

          {/* ===== RIGHT (Desktop Actions) ===== */}
          <div className="hidden md:flex items-center gap-6 text-black">

            <Link href="/">About</Link>
            <Link href="/about">Rerun</Link>

            <Image
              src="/icons/search.svg"
              width={24}
              height={24}
              alt="search"
            />

            <Image
              src="/icons/login.svg"
              width={24}
              height={24}
              alt="login"
            />

            <Link href="/contact">Help</Link>

            <button onClick={() => setDrawer(true)}>
              <Image
                src="/icons/cart.svg"
                width={24}
                height={24}
                alt="cart"
              />
            </button>

          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed left-0 top-16 w-full h-[calc(100vh-4rem)] bg-[#f5f5f3] z-50
        transition-transform duration-300 ease-in-out overflow-hidden
        ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        onClick={() => setOpen(false)}
      >
        <div className="text-black">

          {["Men", "Women", "Sale"].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-4 border-b text-lg font-semibold"
            >
              <span>{item.toUpperCase()}</span>
              <span>›</span>
            </div>
          ))}

          <div className="mt-6 bg-white px-4 py-4 space-y-4">
            <Link href="/">My Account</Link>
            <Link href="/about">About</Link>
            <Link href="/services">ReRun</Link>
            <Link href="/contact">Help</Link>
          </div>

        </div>
      </div>

    
      {bottomOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setBottomOpen(false)}
          />
          
          <BottomDrawer open={bottomOpen}
          onClose={() => setBottomOpen(false)} />
        </>
      )}

    
      {drawer && (
        <>
          
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setDrawer(false)}
          />
        
         <SideDrawer open={drawer}  onClose={() => setDrawer(false)}> </SideDrawer>  

        </>
      )}
    </>
  );
}