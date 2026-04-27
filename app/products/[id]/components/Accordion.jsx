import { useState } from "react";





export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-2xl bg-gray-50">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left"
      >
        <span className="tracking-widest text-sm font-medium uppercase">
          {title}
        </span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] pb-6" : "max-h-0"
        }`}
      >
        <div className="px-6">{children}</div>
      </div>
    </div>
  );
}