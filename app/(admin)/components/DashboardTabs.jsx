'use client';

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "subadmin", label: "SubAdmin" },
];

export default function DashboardTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-2">
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
