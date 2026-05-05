"use client"
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductSlider from "./components/ProductSlider";
import StorySlider from "./components/StorySlider";
import TrendyProductSlider from "./components/TrendingProductSlider";
import VarietySlider from "./components/VarietySlider";
import NewProductsSection from "./components/NewProductsSection"
import AboutHero from "./components/AboutHero"
import {useSession} from "next-auth/react";


export default function Home() {


const  { data :session,status } = useSession();




 if (status === 'loading') {
  return <p>Loading...</p>; // Or a spinner
}

if (status === 'authenticated') {
  // Session is available, you can access session.user
  console.log(session.user);
} 

// else {
//   // User is not authenticated
//   return <p className="  text-black ">Access denied</p>;
// }





  return (
    <div className="flex flex-col bg-zinc-50 font-sans px-4 ">
    <Navbar />
    <HeroSection />
    <ProductSlider />
    <VarietySlider />
    <StorySlider />
   <TrendyProductSlider />
   <NewProductsSection />
   <Footer />
    </div>
  );
}
