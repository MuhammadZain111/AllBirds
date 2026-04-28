"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useState } from "react";
import  Accordion from "./components/Accordion";
import ProductFeature from "./components/ProductFeature"
import Item from "./components/Item"
import ProductDetail from './components/ProductDetail';
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import LifeStyle from './components/LifeStyle'





function ProductDetailPage({product}) {

  




  return (
    
      <div className="min-h-screen bg-[#ede9e2] px-4 md:px-10 py-6">
        
        <Navbar > </Navbar>

        <ProductDetail product={product}>   </ProductDetail> 
 
        <ProductFeature>   </ProductFeature>






        <Footer /> 

    </div>

  )
}

export default ProductDetailPage

