

export default function LifestyleGrid() {
  return (
    <section className="grid md:grid-cols-2 gap-4">
      
      {/* Left Big Image */}
      <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
        <img
          src="/model1.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* Right Side */}
      <div className="grid grid-rows-2 gap-4">
        
        {/* Top Text Block */}
        <div className="bg-green-700 text-white rounded-3xl flex flex-col justify-center items-center text-center p-6">
          <h2 className="text-xl font-semibold">Modern + Refined</h2>
          <p className="text-sm mt-2 max-w-sm">
            Minimalist look, to maximum effect. These sleek, sporty shoes add
            easy sophistication.
          </p>
        </div>

        {/* Bottom Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl overflow-hidden">
            <img
              src="/model2.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="rounded-3xl overflow-hidden">
            <img
              src="/model3.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}