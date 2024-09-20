import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/shared/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <nav className="mb-6">
        <Link to="/admin/products" className="text-blue-500 hover:underline">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">Products Details</span>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                className="max-w-[200px] lg:max-w-sm"
                src={product.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {product.title}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                $ {product.price}
              </div>
              <p className="mb-8">{product.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
