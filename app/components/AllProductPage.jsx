// src/pages/ProductsPage.jsx
import { useState } from "react";
import FilterPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";





const products = [
  { id: 1, name: "Green Slide", price: 45, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Red Flat", price: 65, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Green Sneaker", price: 95, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Blue Sneaker", price: 105, image: "https://via.placeholder.com/200" },
];








export default function AllProducts() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative">
      
      {/* FILTER PANEL */}
      <FilterPanel isOpen={showFilters} setIsOpen={setShowFilters} />

      {/* PAGE CONTENT */}
      <div className="p-4 md:p-8">
        
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            Women's Bestsellers
          </h1>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="border px-4 py-2 rounded-full text-sm hover:bg-gray-100"
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