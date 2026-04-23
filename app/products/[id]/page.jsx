"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/data/products";





const images = [
  "/shoe1.png",
  "/shoe2.png",
  "/shoe3.png",
  "/shoe4.png",
];

const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14];

export default function productsPage({ params}) {

 [selectedSize, setSelectedSize] = useState(null);


  const product = products.find(p => p.id === params.id);

    if (!product) {
       return <div>Product not found</div>;
        }


  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 md:px-10 py-6">
        
      <div className="grid md:grid-cols-2 gap-10 items-start">
    
        <div className="w-full">
          <Swiper
            modules={[Navigation]}
            navigation
            className="rounded-xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <Image
                    src={img}
                    alt="product"
                    fill
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 justify-center">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-20 h-16 border rounded-md overflow-hidden cursor-pointer"
              >
                <Image src={product.image} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (FIXED DETAILS) */}
        <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
          
          <h1 className="text-2xl font-semibold">
            {product.title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            ALSO AVAILABLE IN:{" "}
            <span className="underline cursor-pointer">
              WOMEN'S SIZES
            </span>
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-bold">Price ${product.price}</span>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
              FREE SHIPPING
            </span>
          </div>

          {/* COLORS */}
          <div className="mt-6">
            <p className="text-sm font-medium">
              COLOR: <span className="text-gray-500">Cultured Blue</span>
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border cursor-pointer bg-gray-300"
                  />
                ))}
            </div>
          </div>

          {/* SIZES */}
          <div className="mt-6">
            <p className="text-sm font-semibold">MEN'S SIZES</p>

            <div className="grid grid-cols-4 gap-3 mt-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md py-2 text-sm transition 
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-gray-300 text-gray-600 py-3 rounded-full cursor-not-allowed">
            SELECT A SIZE
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Free Shipping on Orders over $75 <br />
            Easy Returns
          </p>
        </div>
      </div>
    </div>
  );
}

