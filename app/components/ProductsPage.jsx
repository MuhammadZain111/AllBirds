'use client';
import Link from "next/link";
import Header from "@/app/components/common/Header";
import FilterPanel from "@/app/components/FilterPanel";
import PantoneCard from "@/app/components/PantoneCard";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";



//here we will fetch the products from the database and display them in a grid layout. Each product will be a link to its detail page.

export default function ProductsPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (page = 1, category = "") => {
    const params = new URLSearchParams({ page, limit: 50 });
    if (category) params.append("category", category);

    const res = await fetch(`/api/product?${params}`);
    const data = await res.json();

    if (data.success) {
      setProducts(data.products);
      console.log(data.products); // products array
      console.log(data.pagination); // pagination meta
    }
  };



  return (
    <div className="w-full mx-2 p-2">

      <Navbar />
      <Header />
      <FilterPanel />      
      <h1 className="text-3xl font-bold mb-6 text-black">Products</h1>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-4 
          gap-2
        "
      >

         {products.map((item, index) => (
         <PantoneCard key={index} {...item} />
      
        ))}

      </div>
    </div>
  );
}
