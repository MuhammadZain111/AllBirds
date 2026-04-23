import React from "react";
import NewProductsCard from "./NewProductsCard";

function NewProductsSection() {
  const products = [
    {
      id: 1,
      image: "/images/NewArrival1.webp",
      title: "MEN'S CANVAS CRUISER",
    },
    {
      id: 2,
      image: "/images/NewArrival2.webp",
      title: "MEN'S CANVAS CRUISER",
    },
    {
      id: 3,
      image: "/images/NewArrival3.webp",
      title: "MEN'S CANVAS CRUISER",
    },
    {
      id: 4,
      image: "/images/shoes2.png",
      title: "MEN'S CANVAS CRUISER",
    },
  ];

  return (
    <div className="flex items-center justify-between        ">
      {products.slice(0, 3).map((product) => (
        <NewProductsCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default NewProductsSection;