import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { GiCardboardBox } from "react-icons/gi";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="md:flex md:bg-primary border-b-2 min-h-screen">
      <button
        className="md:hidden p-4 text-white bg-primary flex justify-start"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <aside
        className={`fixed inset-0 bg-primary text-white h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-52 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end items-center md:hidden">
          <button onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="mt-10 overflow-y-auto h-full">
          <ul className="text-xl">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
                onClick={closeSidebar}
              >
                <MdSpaceDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/customers"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
                onClick={closeSidebar}
              >
                <FaUsers />
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
                onClick={closeSidebar}
              >
                <BsCartFill />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
                onClick={closeSidebar}
              >
                <GiCardboardBox />
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
