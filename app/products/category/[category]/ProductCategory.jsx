"use client"
import { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import ProductCard from "./components/ProductCard";
import Link from "next/link"
import Image from "next/image"



export default function ProductCategory({product}) {

  const [showFilters, setShowFilters] = useState(false);

const category = product[0]?.category;

  return (
    <div className="relative">
      

      <FilterPanel isOpen={showFilters} setIsOpen={setShowFilters} />


      <div className="p-4 md:p-8">
    

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-black   ">
            Women's Bestsellers.   Category : {category}
          </h1>


           <button onClick={() => setShowFilters(true)} className="border px-4 py-2 rounded-full text-sm hover:bg-gray-100"
          >
            Filter (16 products)
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {product.map((product,index) => (
            <div key={index}> 
 <Link href={`/product/category/${product.category}/${product.id}`} className="block">
      <div className="w-full max-w-md mx-auto rounded-3xl bg-[#f5f3ef] p-6 flex flex-col justify-between h-[500px]">

        {/* COLOR TAG */}
        <div>
          <span className="inline-block bg-[#e5e1d8] text-black text-sm font-semibold px-4 py-2 rounded-full tracking-wide">
            PANTONE COLOR
          </span>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center items-center flex-1">
          <div className="relative w-full h-[200px] md:h-[240px]">
            <Image
              src=""
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-3">
          <h2 className="text-lg text-black t md:text-xl font-semibold tracking-wide">
            {product.title} product id  is fetched{product.id} 
          </h2>
          <h2 className="text-lg text-black t md:text-xl font-semibold tracking-wide">
           {category}
          </h2>


          <p className="text-black text-base md:text-lg">subtitle</p>

          <div className="flex items-center justify-between mt-4">
            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#7a8fa3]"></div>
            </div>

            <span className="text-lg md:text-xl font-semibold text-black">
             {product.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
            </div>
            
          ))}
        </div>

      </div>
    </div>
  );
}
