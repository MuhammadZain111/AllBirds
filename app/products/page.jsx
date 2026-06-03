import ProductsPage from "../components/ProductsPage";

//here we will fetch the products from the database and display them in a grid layout. Each product will be a link to its detail page.

export default function Page() {


  return (
    <div className="w-full mx-auto p-6">
      <ProductsPage />
    </div>
  );
}
