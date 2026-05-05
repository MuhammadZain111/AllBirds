
import { X } from "lucide-react";
import { useState } from "react";






export default function EditProfileModal({open, onClose}) {

    

if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      
      {/* Modal */}
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Edit profile
          </h2>

          <button onClick={() => onClose()}    className="text-gray-500 hover:text-black transition">
            <X className="w-8 h-8" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* First Name */}
            <input
              type="text"
              placeholder="First name"
              className="w-full rounded-lg border-2 border-gray-800 px-5 py-4 text-lg outline-none focus:border-black"
            />

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last name"
              className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg outline-none focus:border-gray-500"
            />
          </div>

          {/* Email */}
          <div className="rounded-lg border border-gray-300 px-5 py-4">
            <p className="text-sm text-gray-500">Email</p>

            <p className="mt-1 text-lg md:text-xl text-black break-all">
              csmuhammadzain@gmail.com
            </p>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-4 cursor-pointer">
            
            <button
              type="button"
              onClick={() => setChecked(!checked)}
              className={`flex h-8 w-8 items-center justify-center rounded transition
                ${
                  checked
                    ? "bg-slate-800 text-white"
                    : "border border-gray-400 bg-white"
                }`}
            >
              {checked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            <span className="text-lg md:text-xl text-black">
              Email me with news and offers
            </span>
          </label>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            
            {/* Cancel */}
            <button className="rounded-lg bg-slate-800 px-7 py-3 text-lg font-semibold text-white transition hover:bg-slate-700">
              Cancel
            </button>

            {/* Save */}
            <button className="cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-7 py-3 text-lg font-semibold text-gray-400">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}