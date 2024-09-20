import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import Loader from "../../../components/shared/Loader";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/orders.json") // Adjust path as needed
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-6">Orders List</h1>
      <div className="overflow-x-auto">
        <table className=" bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-2 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">${order.total}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="text-blue-500 hover:underline flex justify-center"
                  >
                    <GrView size={24} title="view details" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
