"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/common/Footer";
import ProductDetail from "./components/ProductDetail";
import ProductFeature from "./components/ProductFeature";

function ProductDetailPage({ product }) {
  return (
    <div className="min-h-screen bg-[#ede9e2] px-4 md:px-10 py-6">
      <Navbar> </Navbar>

      <ProductDetail product={product}> </ProductDetail>

      <ProductFeature> </ProductFeature>

      <Footer />
    </div>
  );
}

export default ProductDetailPage;
