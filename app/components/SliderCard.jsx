import react from 'react'


const SliderCard = ({ image, title, buttons, bg }) => {
  return (
    <div
      className={`group relative w-full h-[320px] md:h-[380px] overflow-hidden rounded-2xl ${bg} transition-all duration-500`}
    >
      
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain scale-90 group-hover:scale-100 transition-transform duration-500"
      />

    
      <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full">
        {title}
      </div>

    
      <div className="duration-500 bg-black/40 backdrop-blur-md flex flex-col justify-center items-start gap-3 px-6 overflow-hidden">

        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className="text-white border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};