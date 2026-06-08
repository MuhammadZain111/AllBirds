import Image from "next/image";
import { useState } from "react";

// src/components/FilterPanel.jsx
// { isOpen, setIsOpen }
// // if (!isOpen) return null;



export default function FilterPanel() {

const [Open, setIsOpen]=useState(false);



  return (
    <div className=" z-50 overflow-y-auto mt-3 ">
  
  <div class="w-full bg-stone-100 rounded-full px-4 py-3 flex items-center justify-between cursor-pointer  ">
  {/* Left Section  */}
       <button class="flex items-center gap-3 text-gray-800. cursor-pointer"
         onClick={() => setIsOpen(true)}
  >
    <div class="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-black">
      {/* Filter Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M7 12h10M10 18h4"
        />
      </svg>
    </div>

    <span class="font-semibold uppercase tracking-wide text-black ">
      Filter
      <span class="font-normal text-gray-500">(42 products)</span>
    </span>
  </button>

  {/* Right Section */}

  <div class="flex items-center gap-4">
    {/* <Gender Toggle  */}
    <div class="flex items-center border border-gray-400 rounded-full p-1">
      <button
        class="px-6 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold cursor-pointer   "
      >
        MEN
      </button>

      <button
        class="px-6 py-2 rounded-full cursor-pointer text-gray-700 text-sm font-semibold"
      >
        WOMEN
      </button>
    </div>

    {/* <Sort Dropdown */}

    <button
      class="flex items-center gap-3 border border-gray-400 rounded-full px-6 py-3 text-sm font-semibold text-gray-800 cusrsor-pointer  "
    >
      FEATURED

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  </div>
</div>
      
  { Open && (
    <div>
      <div className="flex justify-between items-center cursor-pointer p-4 border-b text-black curosor-pointer  ">
        <button
          onClick={() => setIsOpen(false)}
          className="text-sm font-medium"
        >
          ✕ Collapse Filters
        </button>
        <span className="text-sm text-gray-500">(31 products)</span>
      </div>

      {/* Filters Grid */}

      <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* SIZE */}
        <div>
          <h3 className="font-semibold mb-3 text-black. ">Size</h3>
          <div className="grid grid-cols-4 gap-2 text-sm text-black  cursor-pointer  ">
            {["XS", "S", "M", "L", "XL", "8", "9", "10", "11"].map((size) => (
              <button
                key={size}
                className="border py-2 rounded hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR */}
        <div>
          <h3 className="font-semibold mb-3 text-black ">Color</h3>
          <div className="flex flex-wrap gap-3 text-black curosor-pointer  ">
            {["Black", "Grey", "White", "Red", "Green", "Blue"].map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm curosor-pointer ">
                <input type="checkbox" />
                {c}
              </label>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div>
          <h3 className="font-semibold mb-3 text-black ">Price</h3>
          {["Under $75", "$75-$100", "$100-$150", "Over $150"].map((p) => (
            <label key={p} className="flex cursor-pointer  gap-2 mb-2 text-sm text-black">
              <input type="checkbox" />
              {p}
            </label>
          ))}
        </div>

        {/* PRODUCT TYPE */}
        <div>
          <h3 className="font-semibold mb-3 text-black ">Product Type</h3>
          {["Sneakers", "Sandals", "Slip Ons", "Running"].map((t) => (
            <label key={t} className="flex gap-2 mb-2 text-sm cursor-pointer text-black ">
              <input type="checkbox" />
              {t}
            </label>
          ))}
        </div>

        {/* MATERIAL */}
        <div>
          <h3 className="font-semibold mb-3 text-black">Material</h3>
          {["Canvas", "Cotton", "Wool"].map((m) => (
            <label key={m} className="flex gap-2 mb-2 text-sm text-black cursor-pointer">
              <input type="checkbox" />
              {m}
            </label>
          ))}
        </div>
      </div>


</div>


)} 
   </div>      
  );
}
