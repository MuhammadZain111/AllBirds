import React from 'react';




export default  ProductCard = ({ image, title, buttons, bg }) => {
  return (
    <div
      className={`group relative w-full h-[350px] md:h-[500px] overflow-hidden rounded-2xl ${bg} rounded-md transition-all duration-400 ease-in-out hover:rounded-[300px] `}
    >
     
     <div className="relative w-[400px] h-[100px]">
     <Image src="/images/image _37.jpg" alt={title} width={400} height={100}
       className="object-contain z-0"
        />
     </div>
   
  
      <div className=" relative z-10 flex flex-col items-center justify-center h-full ">


      <div className="text-white text-sm px-3 py-1 rounded-full transition-all duration-300 hover:rounded-full ">{title}</div>


        {buttons.map((btn, idx) => (
          <Link
              href={`/products/${product.id}`}
            key={idx}
            className="text-white border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black  hover:cursor-pointer opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0  mt-2"
          >
            {btn}
          </Link>
        ))}
      </div>
    </div>
  );
};