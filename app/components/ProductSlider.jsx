"use client"
import React from "react";
import Image from "next/image";
import { productsCategories } from "@/app/data/products";
import {ProductCard} from './ProductCard'



export default function ProductSlider() {
  return (

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
  {productsCategories.map((item, index) => (
    <ProductCard
      key={index}
      id={item.id}
      image={item.image}
      title={item.title}
      bg={item.bg}
      buttons={item.buttons}
    />
  ))}
</div>
  );
}