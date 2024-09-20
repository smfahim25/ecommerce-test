import React, { useEffect, useState } from "react";
import { LuView } from "react-icons/lu";
import { Link } from "react-router-dom";
import Loader from "../../../components/shared/Loader";
import { FaPlus } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="flex justify-end mb-3">
        <Link
          to="/admin/products/add"
          className="mt-4 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/admin/products/${product.id}`}
                  className="text-blue-500 hover:underline flex justify-center"
                >
                  <LuView size={24} title="view" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
