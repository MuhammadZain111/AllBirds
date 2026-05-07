"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SideDrawer from "./SideDrawer";
import BottomDrawer from "./BottomDrawer";

import ProfileAvatar from "./ProfileAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Moon, Bell, User, Settings, CircleHelp, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  const [drawer, setDrawer] = useState(false);

  const [bottomOpen, setBottomOpen] = useState(false);

  const [opendropdown, setOpendropdown] = useState(false);

  const [dropdown, setDropdown] = useState(false);

  const [openavatar, setopenavatar] = useState();

  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push("/profile");
    } else {
      router.push("/sign-in");
    }
  };

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
    <>
      <nav className="fixed top-2 mt-3 left-0 w-full md:w-[99vw] z-[60] bg-white shadow-md rounded-2xl ">
        <div className="flex items-center justify-between h-16 px-4">
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
            <button
              className="cursor-pointer"
              onClick={() => setBottomOpen(!bottomOpen)}
              href="/men"
            >
              Men
            </button>

            <Link href="/women">Women</Link>
            <Link href="/sale">Sale</Link>
          </div>

          {/* ===== RIGHT (Desktop Actions) ===== */}
          <div className="hidden md:flex items-center gap-6 text-black">
            <div className="relative inline-block">
              <Link className="cursor-pointer " href="/">
                My Account
              </Link>
            </div>

            <Link href="/">Rerun</Link>

            <Image
              src="/icons/search.svg"
              width={24}
              height={24}
              alt="search"
            />

            <button className="cursor-pointer" onClick={handleClick}>
              <Image
                src="/icons/login.svg"
                width={24}
                height={24}
                alt="login"
              />
            </button>

            <Link href="/contact">Help</Link>

            <button onClick={() => setDrawer(true)}>
              <Image src="/icons/cart.svg" width={24} height={24} alt="cart" />
            </button>

            {status === "loading"
              ? null
              : session && (
                  <div className="relative">
                    {/* Profile Button */}

                    <button
                      onClick={() => setDropdown(!dropdown)}
                      className="w-10 h-10 rounded-full bg-[#352C4D] flex items-center justify-center text-white transition overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={user?.profileImage || "/default-avatar.png"}
                        width={50}
                        height={40}
                        alt="Profile Image"
                        className="rounded-full object-cover"
                      />
                    </button>

                    {/* Dropdown */}
                    {dropdown && (
                      <div className="absolute top-16 right-0 w-[350px] rounded-3xl border border-gray-200 bg-white shadow-lg p-6 z-50">
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
                            <span className="text-lg font-medium">
                              Edit profile
                            </span>
                          </button>

                          <Link
                            href="/profile"
                            className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition"
                          >
                            <Settings className="w-5 h-5" />
                            <span className="text-lg font-medium">
                              Account settings
                            </span>
                          </Link>

                          <button className="flex items-center gap-4 text-slate-700 hover:text-blue-600 transition">
                            <CircleHelp className="w-5 h-5" />
                            <span className="text-lg font-medium">Support</span>
                          </button>
                        </div>
                        {/* Divider */}
                        <div className="my-6 border-t border-gray-200"></div>
                        {/* Logout */}{" "}
                        <button
                          className="cursor-pointer text-black"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </button>
                        {/* Avatar Component */}
                      </div>
                    )}
                  </div>
                )}
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
            <div
              className="relative inline-block"
              onMouseEnter={() => setOpendropdown(true)}
              onMouseLeave={() => setOpendropdown(false)}
            >
              <Link className="cursor-pointer " href="/">
                My Account
              </Link>
              //here profile drop down
            </div>

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

          <BottomDrawer
            open={bottomOpen}
            onClose={() => setBottomOpen(false)}
          />
        </>
      )}

      {drawer && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setDrawer(false)}
          />

          <SideDrawer open={drawer} onClose={() => setDrawer(false)}>
            {" "}
          </SideDrawer>
        </>
      )}
    </>
  );
}
