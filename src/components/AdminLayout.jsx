import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom"; // Outlet for nested routes
import { FiMenu, FiX } from "react-icons/fi"; // Menu and close icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { GiCardboardBox } from "react-icons/gi";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-white bg-primary flex justify-start"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={` fixed inset-0 bg-primary text-white h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-52 border-b-2 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end items-center md:hidden">
          <button onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="mt-10">
          <ul className="text-xl">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
              >
                <MdSpaceDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/customers"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
              >
                <FaUsers />
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
              >
                <BsCartFill />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-700"
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
