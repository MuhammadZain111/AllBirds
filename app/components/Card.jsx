import React from 'react'
import Image from "next/image"






function Card() {
 

const buttons =["button1"
    ,"button2"]


 
    return (
    <div>
     <div className={`group relative w-[400px] h-[320px] md:h-[500px] overflow-hidden rounded-sm`}
    >
      
       <div className="relative w-[400px] h-[100px]">
           <Image src="/images/image_37.jpg" alt="image" width={400} height={100}
             className="object-contain z-0"
              />
           </div>

    <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full text-black">title
        
      </div>





     </div>
     
     

      <div className="h-full duration-500 bg-black/40  flex flex-col justify-center items-start gap-3 px-6 overflow-hidden">


      <div className="absolute top-5 left-5 bg-white/20  text-white text-sm px-3 py-1 rounded-full">title
      </div>

       <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm" >hhi </p>



      </div>
    

    </div>
  )
}

export default Card
