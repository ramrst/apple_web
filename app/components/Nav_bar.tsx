import Image from "next/image";
import React from "react";
import { FaApple } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
const Nav_bar: React.FC = (): JSX.Element => {
  return (
    <header className="realtive">
      <nav className="flex items-center justify-between p-4 ">
        <FaApple className="text-white text-2xl" />
        <div className="flex flex-1 justify-center gap-20 max-sm:hidden  max-md:gap-10">
          {["iPhone", "Mac", "iPad", "Watch", "Support"].map((item, index) => (
            <div
              key={item}
              className=" text-sm  cursor-pointer text-gray-500 font-semibold hover:text-white transition-all  "
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 ">
          <IoMdSearch className="text-white text-2xl cursor-pointer" />
          <IoBagHandleOutline className="text-white text-2xl cursor-pointer" />
        </div>
      </nav>
    </header>
  );
};

export default Nav_bar;
