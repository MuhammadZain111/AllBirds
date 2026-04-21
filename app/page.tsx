"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection"



export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans px-4 ">
   <Navbar />
   <HeroSection />
    </div>
  );
}
