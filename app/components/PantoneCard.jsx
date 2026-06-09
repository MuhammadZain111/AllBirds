"use client";
import Image from "next/image";
import Link from "next/link";

export default function PantoneCard({
  _id: id,
  image,
  title,
  subtitle,
  price,
  color,
  stock
}) {
  return (

<Link href={{ pathname: `/products/${id}`,query: { from: "category" }
}}  className="block">
      <div className="w-full max-w-md mx-auto rounded-3xl bg-[#f5f3ef] p-6 flex flex-col justify-between h-[500px]">
        {/* COLOR TAG */}
        <div>
          <span className="inline-block bg-[#e5e1d8] text-black text-sm font-semibold px-4 py-2 rounded-full tracking-wide">
            PANTONE COLOR {color}
          </span>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center items-center flex-1">
          <div className="relative w-full h-[200px] md:h-[240px]">
            <Image src={image[0]} alt={title} fill className="object-contain" />
          </div>
        </div>


        {/* CONTENT */}
        <div className="space-y-3">
          
          <div classNna="text-black   ">
          
           <h2 className="text-lg text-black t md:text-xl font-semibold tracking-wide">
            {title}
          </h2>

          {stock === 0 ? ( <span className="text-green "   >Out of Stock</span> ) : stock <= 5 ? (
             <span className="text-black    " >Only a few left</span> ) : (
             <span className="text-black " > In Stock</span> )}
    
          </div>

         

          <p className="text-black text-base md:text-lg">{subtitle}</p>

          <div className="flex items-center justify-between mt-4">
            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#7a8fa3]"></div>
            </div>
        
           <span className="text-lg md:text-xl font-semibold text-black">
              ${price}
            </span>

       </div>





        </div>
      </div>
    </Link>
  );
}
