import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/shared/Loader";
import { FaPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-6">Customers List</h1>
      <div className="flex justify-end mb-3">
        <Link
          to="/admin/customers/add"
          className="mt-4 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlus />
          Add Customer
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-lg">ID</th>
              <th className="px-4 py-2 border text-lg">Name</th>
              <th className="px-4 py-2 border text-lg">Email</th>
              <th className="px-2 py-2 border text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="border px-4 py-2 text-lg">{customer.id}</td>
                <td className="border px-4 py-2 text-lg">
                  {customer.name.firstname} {customer.name.lastname}
                </td>
                <td className="border px-4 py-2 text-lg">{customer.email}</td>
                <td className="border px-2 py-2">
                  <Link
                    to={`/admin/customers/${customer.id}`}
                    className="text-blue-500 hover:underline flex justify-center text-lg"
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

export default CustomersList;
