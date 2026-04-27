


export default function Item({ title, text }) {
  return (
    <div className="flex gap-4 items-start">
      {/* Circle icon */}
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>

      {/* Content */}
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}