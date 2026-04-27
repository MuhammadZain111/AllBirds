export default function ProductFeature() {
  return (
    <section className="bg-gray-50 rounded-3xl p-6 md:p-10 grid md:grid-cols-3 gap-8 items-center">
      

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          A sporty classic, made wildly comfortable. A light and stretchy
          one-piece upper provides a sock-like fit...
        </p>

        <div>
          <p className="text-xs tracking-widest text-gray-500 mb-2">BEST FOR</p>
          <div className="flex flex-wrap gap-2">
            {["Traveling", "Walking", "Light Workouts", "Everyday"].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="text-sm underline">View technical details</button>
      </div>

      {/* Center Image */}
      <div className="flex justify-center">
        <div className="w-72 h-72 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src="/shoe.png"
            alt="shoe"
            className="w-64 object-contain"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="space-y-4">
        <p className="text-xs tracking-widest text-gray-500">
          THOUGHTFULLY DESIGNED
        </p>

        <ul className="space-y-3 text-sm text-gray-700">
          <li>• Breathable TENCEL™ Lyocell upper</li>
          <li>• Sugarcane-based SweetFoam® cushioning</li>
          <li>• 100% recycled polyester laces</li>
        </ul>
      </div>
    </section>
  );
}