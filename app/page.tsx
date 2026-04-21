"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection"
import Footer from "./components/Footer"
import ProductSlider from "./components/ProductSlider"
import Card from "./components/Card"
import StorySlider from "./components/StorySlider"



export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans px-4 ">
   <Navbar />
    <HeroSection />
   
     <Card />


    

   <ProductSlider />
   <Footer />
    </div>
  );
}
