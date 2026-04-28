import React from 'react'
import AboutHero from "@/app/components/AboutHero"
import Mission from "@/app/components/Mission"
import AboutSlider from "@/app/components/AboutSlider"
import Footer from "@/app/components/Footer"


function  About() {
 
  return (
    <div>
     <AboutHero />
     <Mission />  
     <AboutSlider />
     <Footer ></Footer>

    </div>
  )
}

export default About
