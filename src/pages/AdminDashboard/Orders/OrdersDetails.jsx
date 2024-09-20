import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/shared/Loader";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/orders.json") // Adjust path as needed
      .then((res) => res.json())
      .then((data) => {
        const foundOrder = data.find((order) => order.id === parseInt(id));
        setOrder(foundOrder);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Customer Name:</strong> {order.customerName}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
