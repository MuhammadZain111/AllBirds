import { products } from "@/app/data/products";
import ProductDetailPage from "./ProductDetailPage";




export default async function Page({ params }) {
   const { id } = await params;
   console.log(id);
  console.log("PARAMS:", params);
  console.log("PARAMS:", params);
  console.log("ID:", params.id);

  if (!id) {
    return <h1>No ID found</h1>;
  }

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  console.log("PRODUCT:", product);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return <ProductDetailPage product={product} />;
}

