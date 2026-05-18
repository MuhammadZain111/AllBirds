"use client";

import {
  Shield,
  ChartNoAxesColumn,
  Users,
  UserCheck,
  Calendar,
  FileText,
  CircleAlert,
  Activity,
} from "lucide-react";

import { useEffect } from "react";

const menuItems = [
  {
    name: "Overview",
    icon: ChartNoAxesColumn,
    id: 1,
  },
  {
    name: "User Management",
    icon: Users,
    id: 2,
  },
  {
    name: "Products",
    icon: UserCheck,
    id: 3,
  },
  {
    name: "New Prducts",
    icon: Calendar,
    id: 4,
  },
  {
    name: "Reports & Analytics",
    icon: FileText,
    id: 5,
  },
  {
    name: "Financial Disputes",
    icon: CircleAlert,
    id: 6,
    active: true,
  },
  {
    name: "System Logs",
    icon: Activity,
    id: 7,
  },
  {
    name: "Add",
    icon: ChartNoAxesColumn,
    id: 8,
  },
];

type SideTabsProps = {
  activeTab: Number;
  onChange: (tab: string) => void;
};


export default function SideTabs({ activeTab, onChange }: SideTabsProps) {
  useEffect(() => {
    console.log(activeTab);
  }, []);

  return (
    <div className="flex flex-col gap-6 px-6 py-8  ">
      {menuItems.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange("")}
            className={`flex items-center gap-5 w-full w  px-6 py-2 cursor-pointer rounded-sm transition-all duration-300 hover:bg-[#E5B168] ${
              isActive ? "bg-[7592ff] text-[#2B160D]" : "text-black text-black"
            }`}
          >
            <Icon className="w-8 h-8" strokeWidth={2.2} />
            <span className="text-[15px] font-semibold">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
}
