"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useState } from "react";
import Accordion from "./Accordion";
import ProductFeature from "./ProductFeature";
import Item from "./Item";
import { useCart } from "@/app/Context/CartContext";

function ProductDetail({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const images = ["/shoe1.png", "/shoe2.png", "/shoe3.png", "/shoe4.png"];

  const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14];

  const { addItem } = useCart();

  const colorsArray = Array.isArray(product.colors)
    ? product.colors
    : (product.colors || "").split(",");

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 md:px-10 py-8 mt-16 border-2 rounded-xl">
      <div className="grid md:grid-cols-3 gap-10 items-start pt-8 mt-10 ">
        <div className="w-full col-span-2 ">
          <Swiper modules={[Navigation]} navigation className="rounded-xl">
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <Image
                    src={product.image[0]}
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
                className="relative w-24 h-16 border rounded-md overflow-hidden cursor-pointer"
              >
                <Image
                  src={product.image[0]}
                  alt="thumb"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white p-6 rounded-xl shadow-md sticky top-6 text-black w-full ">
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          <p className="text-sm text-gray-500 mt-1 text-black ">
            ALSO AVAILABLE IN:{" "}
            <span className="underline cursor-pointer">WOMEN'S SIZES</span>
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-bold text-black">
              Price ${product.price}
            </span>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
              FREE SHIPPING
            </span>
          </div>

          {/* COLORS */}
          <div className="mt-6">
            <p className="text-sm font-medium">
              COLOR: <span className="text-gray-500">Cultured Blue</span>
            </p>

            {/* const colorsArray = colorsString.split(","); */}

            <div className="flex gap-2 mt-3 flex-wrap">
              {colorsArray.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={index}
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
                  className={`border rounded-md py-2 curosor-pointer  text-sm transition 
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

          <button
            onClick={() => addItem(product)}
            disabled={!selectedSize}
            className={`w-full mt-6 py-3 rounded-full ${
              selectedSize
                ? "bg-black text-white cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {selectedSize ? "ADD TO CART" : "SELECT A SIZE"}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Free Shipping on Orders over $75 <br />
            Easy Returns
          </p>
        </div>
      </div>
      //Here is the product Feature Section
      <Accordion title="Materials & Sustainability" defaultOpen>
        <div className="grid md:grid-cols-3 gap-6">
          <Item
            title="Upper Tree Knit"
            text="TENCEL™ Lyocell + recycled polyester blend"
          />
          <Item title="Midsole SweetFoam®" text="Sugarcane-based EVA foam" />
          <Item
            title="Outsole Natural Rubber"
            text="Durable rubber for traction"
          />
        </div>
      </Accordion>
    </div>
  );
}

export default ProductDetail;
