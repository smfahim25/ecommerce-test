import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/shared/Loader";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <nav className="mb-6">
        <Link to="/admin/customers" className="text-blue-500 hover:underline">
          Customers
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">Customer Details</span>
      </nav>
      <h1 className="text-4xl font-bold mb-6">Customer Details</h1>
      <div className="bg-base-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <div className="mb-4">
          <strong>ID:</strong> {customer.id}
        </div>
        <div className="mb-4">
          <strong>Name:</strong> {customer.name.firstname}{" "}
          {customer.name.lastname}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {customer.email}
        </div>
        <div className="mb-4">
          <strong>Username:</strong> {customer.username}
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> {customer.phone}
        </div>
        <div className="mb-4">
          <strong>Address:</strong> {customer.address.street},{" "}
          {customer.address.city}, {customer.address.zipcode}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
