


export default function FilterPanel({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <button
          onClick={() => setIsOpen(false)}
          className="text-sm font-medium"
        >
          ✕ Collapse Filters
        </button>
        <span className="text-sm text-gray-500">(31 products)</span>
      </div>

      {/* Filters Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* SIZE */}
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {["XS","S","M","L","XL","8","9","10","11"].map((size) => (
              <button
                key={size}
                className="border py-2 rounded hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR */}
        <div>
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex flex-wrap gap-3">
            {["Black","Grey","White","Red","Green","Blue"].map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                {c}
              </label>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div>
          <h3 className="font-semibold mb-3">Price</h3>
          {["Under $75","$75-$100","$100-$150","Over $150"].map((p) => (
            <label key={p} className="flex gap-2 mb-2 text-sm">
              <input type="checkbox" />
              {p}
            </label>
          ))}
        </div>

        {/* PRODUCT TYPE */}
        <div>
          <h3 className="font-semibold mb-3">Product Type</h3>
          {["Sneakers","Sandals","Slip Ons","Running"].map((t) => (
            <label key={t} className="flex gap-2 mb-2 text-sm">
              <input type="checkbox" />
              {t}
            </label>
          ))}
        </div>

        {/* MATERIAL */}
        <div>
          <h3 className="font-semibold mb-3">Material</h3>
          {["Canvas","Cotton","Wool"].map((m) => (
            <label key={m} className="flex gap-2 mb-2 text-sm">
              <input type="checkbox" />
              {m}
            </label>
          ))}
        </div>

      </div>
    </div>
  );
}