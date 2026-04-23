import React from 'react'
import NewProductsCard from "./NewProductsCard"



function NewProductsSection() {



      const products = [
   {
    image: "/images/shoes1.png",
    title: "MEN'S CANVAS CRUISER",
    subtitle: "Cultured Blue",
    price: 75,
    color: "#7a8fa3",
  },
  {
    image: "/images/shoes2.png",
    title: "MEN'S CANVAS CRUISER",
    subtitle: "Adventurous Auburn",
    price: 75,
    color: "#a0523d",
  },
  {
    image: "/images/shoes3.png",
    title: "MEN'S CANVAS CRUISER",
    subtitle: "Adventurous Auburn",
    price: 75,
    color: "#a0523d",
  },
 {
    image: "/images/shoes2.png",
    title: "MEN'S CANVAS CRUISER",
    subtitle: "Adventurous Auburn",
    price: 75,
    color: "#a0523d",
  },
];



 return (
    <div>
{
products.slice(0, 6).map(product => (
  <NewProductsCard key={product.id} product={product} />
))
}







    </div>
  )
}

export default NewProductsSection
