import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";


function AllProducts() {

const [products, setProducts] = useState([]);


const fetchProducts = async () => {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();


      // Handle HTTP errors
    if (!res.ok) {
      console.log("Server Error:", res.status);
      setProducts([]);
      return;
    }

      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) { 
     console.log("Error fetching products:", err);
      setProducts([]);
    }     
  }   


useEffect(() => {
  fetchProducts();
}, []);


  // const products = [
  //   { id: 1, name: "iPhone 15", price: 1200, stock: 10, status: "Active" },
  //   { id: 2, name: "Samsung S24", price: 1100, stock: 5, status: "Inactive" },
  //   { id: 3, name: "MacBook Pro", price: 2500, stock: 7, status: "Active" },
  // ];

  return (
    <div className="p-6 w-[95%] mt-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <h3 className="text-black ">Total Products Coming are {products.length}</h3>

        <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition">
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="p-4">ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Sold Prducts</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                
                <td className="p-4 text-gray-600">{product.id}</td>

                <td className="p-4 font-medium text-gray-900">
                  {product.title}
                </td>

                <td className="p-4 text-gray-700">${product.price}</td>

                <td className="p-4 text-gray-700">{product.stock}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-4 text-center text-gray-700">150</td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    {/* Edit */}
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProducts;
