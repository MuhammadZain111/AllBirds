import React from 'react'
import Image from 'next/image'



function AboutHero() {

    return (
 <div className="w-[500px] h-[800px] rounded-xl overflow-hidden cursor-pointer group relative">

      <Image
        src=""
        alt="heroabout image"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="absolute bottom-5 w-full px-4 text-white">
        <h2 className="text-lg font-semibold mb-3">
          Here Will Be the Heading 
        </h2>
        
         <h3 className="text-lg font-semibold mb-3">
          Here will Be the sub heading 
        </h3>
       

      </div>

    </div>
    
  )
}

export default AboutHero
