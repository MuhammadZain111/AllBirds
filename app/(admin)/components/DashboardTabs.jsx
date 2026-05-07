"use client";

const tabs = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Users" },
  { id: 3, label: "SubAdmin" },
  { id: 4, label: "Add Products" },
];

export default function DashboardTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-2 cursor-pointer   ">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-md px-3 py-2 text-sm ${
              isActive ? "bg-black text-white" : "border bg-white text-black"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
