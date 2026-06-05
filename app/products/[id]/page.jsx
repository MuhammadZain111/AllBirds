import ProductDetailPage from "./ProductDetailPage";

import { API_URL } from "@/config";




export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return <h1 className="text-red-500">No Product ID provided</h1>;
  }

  let data;


  try {
    const res = await fetch(`${API_URL}/product/${id}`, {
      cache: "no-store",
    });

    // 2. Handle HTTP errors (404, 500, etc.)
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    data = await res.json();
  } catch (error) {
    console.error("Fetch Error:", error.message);

    return (
      <h1 className="text-red-500">
        Failed to load product. Please try again later.
      </h1>
    );
  }

  // 3. Handle API response errors
  if (!data?.success || !data?.product) {
    return <h1 className="text-red-500">Product not found</h1>;
  }

  return <ProductDetailPage product={data.product} />;
}
