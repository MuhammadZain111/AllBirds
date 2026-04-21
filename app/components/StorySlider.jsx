"use client"
import React from 'react'
import Image from "next/image"
import { useEffect,useState } from 'react'





function StorySlider() {




const slides = [
  {
    img1: "/images/image1.jpg",
    img2: "/images/image2.jpg",
    img3: "/images/image3.jpg",
    img4: "/images/image4.jpg",
  },

  {
    img1: "/images/5.jpg",
    img2: "/images/6.jpg",
    img3: "/images/7.jpg",
    img4: "/images/8.jpg",
  },
];



const [activeIndex, setActiveIndex] = useState(0);



useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"> 

 



   <div className="leftdiv bg-amber-500 pd-8 lg:col-span-2 space-y-6" >
    <h1>Here is th efels isdecontainer  </h1>
   <Image
    src={slides[activeIndex].img1}
   alt="image"
  width={400}
  height={300}
   />



   </div>


  <div classNam="rightdiv  bg-red  lg:col-span-2 space-y-6">
    <h2>Here is  the Right Div </h2>


     <div className="upperdiv w-full     ">
      <Image 
        alt="image"
         width={400} height={300}
         src={slides[activeIndex].img2} />

      </div>

    <div className="Lowerdiv w-full       "   >

     <div className=" lower_left "    >
        <Image
         src={slides[activeIndex].img3}
         alt="image" width={400}
          height={300} />
     </div>

     <div className="Lower_rightdiv      ">
      <Image src={slides[activeIndex].img4}
      alt="image" width={400} height={300}
      />
     </div>

    </div>

   </div>
   









    </div>
  )
}

export default StorySlider
