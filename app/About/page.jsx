import React from "react";
import AboutHero from "@/app/components/AboutHero";
import Mission from "@/app/components/Mission";
import AboutSlider from "@/app/components/AboutSlider";
import Footer from "@/app/components/common/Footer";

function page() {
  return (
    <div>
      <AboutHero />
      <Mission />
      <AboutSlider />
      <Footer />
    </div>
  );
}

export default page;
