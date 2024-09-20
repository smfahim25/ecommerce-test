import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
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
          <Link to={"/login"} className="text-lg">
            <div className="w-[40px]">Login</div>
          </Link>
          <Link to={"/signup"} className="text-lg">
            <div className="">Sign Up</div>
          </Link>
          <div className="cursor-pointer flex relative">
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
