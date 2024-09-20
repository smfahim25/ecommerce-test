import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import { SidebarContext } from "../../context/SidebarContext";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  // header state
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const isAdminPath = location.pathname.startsWith("/admin");

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"} ${
        isAdminPath ? "static" : "fixed"
      } w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <div>
          <Link to={"/"}>
            <div className="w-[40px]">
              <img src="/img/logo.svg" alt="" />
            </div>
          </Link>
        </div>

        {/* cart */}
        <div className="flex gap-3">
          <Link to={"/login"} className="text-lg flex items-center gap-1">
            <span>
              <FaRegUser />
            </span>
            <div className=" font-semibold">Login/Register</div>
          </Link>
          <div
            className="cursor-pointer flex relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
