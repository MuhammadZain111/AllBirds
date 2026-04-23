import { products } from "@/app/data/products";

export default function Page({ params }) {
  console.log("PARAMS:", params);
  console.log("PARAMS:", params);
  console.log("ID:", params.id);

  if (!params?.id) {
    return <h1>No ID found</h1>;
  }

  const product = products.find(
    (p) => String(p.id) === String(params.id)
  );

  console.log("PRODUCT:", product);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return <h1>{product.title}</h1>;
}

