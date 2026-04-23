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





export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans px-4 ">
    <Navbar />
    <HeroSection />
    <ProductSlider />
    <VarietySlider />
    <StorySlider />
   <TrendyProductSlider />
    <NewProductsSection />
    <AboutHero />

   <Footer />
    </div>
  );
}
