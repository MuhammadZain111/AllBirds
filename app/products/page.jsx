import ProductsPage from "../components/ProductsPage";
import { API_URL } from "@/config";

export default async function Page({ searchParams }) {

  const { category, page = 1 } =await searchParams || {};

  const params = new URLSearchParams();


   console.log(params);

  params.append("page", page);
  params.append("limit", 30);

  //  only add category if it exists
  if (category) {
    params.append("category", category);
  }

  const res = await fetch(
    `${API_URL}/product?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

    console.log("data fetched is"+data);


  return (
    <ProductsPage
      products={data.products}
      pagination={data.pagination}
    />
  );
}