"use client"
import { useState } from "react";
import FilterPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
import { products } from "@/app/data/products";



export default function AllProducts({product}) {

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative">
      

      <FilterPanel isOpen={showFilters} setIsOpen={setShowFilters} />


      <div className="p-4 md:p-8">
    

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            Women's Bestsellers
          </h1>


           <button onClick={() => setShowFilters(true)} className="border px-4 py-2 rounded-full text-sm hover:bg-gray-100"
          >
            Filter (16 products)
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </div>
  );
}
