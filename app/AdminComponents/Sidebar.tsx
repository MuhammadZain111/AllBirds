"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Menu, X, LayoutGrid, Bot, ShoppingCart, Calendar, UserCircle, ClipboardList, FileText, Table, Layers, MessageCircle, Headphones, Mail,
  Box,
  ChevronDown,
  MoreHorizontal,
  PieChart
} from "lucide-react";




import {
  Briefcase,
  Users,
  Building2,
  Search,
  Bookmark,
  BarChart3,
  GitBranch,
  Bell,
  CreditCard,
  Settings
} from "lucide-react";






const employerMenuItems = [
  {
    title: "MENU",
    items: [
      { id: 1, name: "Dashboard", icon: LayoutGrid },
      { id: 2, name: "AI Assistant", icon: Bot, badge: "NEW" },
      { id: 3, name: "Add Product", icon: ShoppingCart },
      { id: 4, name: "Calendar", icon: Calendar },
      { id: 5, name: "User Profile", icon: UserCircle },
      { id: 6, name: "Task", icon: ClipboardList },
      { id: 7, name: "Forms", icon: FileText },
      { id: 8, name: "Tables", icon: Table },
      { id: 9, name: "Pages", icon: FileText },
      { id: 10, name: "Layouts", icon: Layers, badge: "NEW" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { id: 11, name: "Chat", icon: MessageCircle },
      { id: 12, name: "Support Ticket", icon: Headphones, badge: "NEW" },
      { id: 13, name: "Email", icon: Mail },
    ],
  },
  {
    title: "OTHERS",
    items: [
      { id: 14, name: "Charts", icon: PieChart },
      { id: 15, name: "UI Elements", icon: Box },
    ],
  },
];


const supermenuItems = [
  {
    title: "MAIN",
    items: [
      {
        id: 1,
        name: "Dashboard",
        icon: LayoutGrid,
      },
      {
        id: 2,
        name: "Post Job",
        icon: Briefcase,
        badge: "NEW",
      },
      {
        id: 3,
        name: "Manage Jobs",
        icon: ClipboardList,
      },
      {
        id: 4,
        name: "Applications",
        icon: FileText,
      },
      {
        id: 5,
        name: "Shortlisted Candidates",
        icon: Users,
      },
      {
        id: 6,
        name: "Interviews",
        icon: Calendar,
      },
      {
        id: 7,
        name: "Messages",
        icon: MessageCircle,
      },
      {
        id: 8,
        name: "Company Profile",
        icon: Building2,
      },
    ],
  },

  {
    title: "RECRUITMENT",
    items: [
      {
        id: 9,
        name: "Talent Search",
        icon: Search,
      },
      {
        id: 10,
        name: "Saved Candidates",
        icon: Bookmark,
      },
      {
        id: 11,
        name: "Job Analytics",
        icon: BarChart3,
      },
      {
        id: 12,
        name: "Hiring Pipeline",
        icon: GitBranch,
      },
    ],
  },

  {
    title: "SETTINGS",
    items: [
      {
        id: 13,
        name: "Notifications",
        icon: Bell,
      },
      {
        id: 14,
        name: "Billing & Plans",
        icon: CreditCard,
      },
      {
        id: 15,
        name: "Settings",
        icon: Settings,
      },
      {
        id: 16,
        name: "Help & Support",
        icon: Headphones,
      },
    ],
  },
];
















export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState(1);

  // sidebar closed by default
  const [open, setOpen] = useState(false);

  const {data:session , data} = useSession();



const menuItems =session?.user?.role === 1 ? supermenuItems : employerMenuItems;
  

  return (
    <div className="flex">
      {/* Hamburger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-5 left-5 z-50 rounded-xl bg-blue-600 p-2 text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen overflow-y-auto border-r border-gray-200 bg-white shadow-sm transition-all duration-300
        ${open ? "w-[290px]" : "w-[90px]"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center border-b py-5
          ${open ? "justify-between px-5" : "justify-center"}`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
              <LayoutGrid className="text-white" size={24} />
            </div>

            {/* Title Only in Open Mode */}
            {open && (
              <h1 className="text-3xl font-bold text-slate-900">{session?.user?.role === 1 ? "SuperAdmin" : "Employer"}</h1>
            )}
          </div>

          {/* Close Button */}
          {open && (
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X className="text-slate-700" size={22} />
            </button>
          )}
        </div>

        {/* Menu Sections */}
        <div className="px-3 py-6">
          { menuItems.map((section, index) => (
            <div key={index} className="mb-8">
              {/* Section Title */}
              {open ? (
                <p className="mb-4 px-3 text-sm font-semibold tracking-wide text-slate-400">
                  {section.title}
                </p>
              ) : (
                <div className="mb-5 flex justify-center">
                  <MoreHorizontal className="text-slate-400" />
                </div>
              )}

              {/* Items */}
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;

                  return (
                    <button key={i}
                     onClick={() => {router.push(`/${session?.user?.role === 1 ? "superadmin" : "admindashboard"}?tab=${item.id}`);
  setActive(item.id);
}}
                      className={`cursor-pointer group flex w-full items-center rounded-2xl transition-all duration-200
                      
                      ${
                        open
                          ? "justify-between px-4 py-4"
                          : "justify-center py-4"
                      }

                      ${
                        isActive
                          ? "border border-blue-600 bg-blue-50"
                          : "hover:bg-gray-100 border-0"
                      }`}
                    >
                      {/* Left Side */}
                      <div className="flex items-center gap-4">
                        <Icon
                          size={20}
                          className={`${
                            isActive ? "text-blue-600" : "text-slate-500"
                          }`}
                        />

                        {/* Text only in open mode */}
                        {open && (
                          <span
                            className={`text-lg font-semibold ${
                              isActive ? "text-blue-600" : "text-slate-700"
                            }`}
                          >
                            {item.name}
                          </span>
                        )}
                      </div>

                      {/* Right Side */}
                      {open && (
                        <div className="flex items-center gap-3">
                          {item.badge && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                              {item.badge}
                            </span>
                          )}

                          <ChevronDown size={18} className="text-slate-500" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* her will e the main content */}

      {/* <main
        className={`transition-all duration-300 p-6 ${
          open ? "ml-[290px]" : "ml-[90px]"
        }`}
      >
      </main> */}
    </div>
  );
}
