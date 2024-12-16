import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>

      <header className=" fixed  z-10 h-20 w-full flex items-center px-4 md:px-8">
        {" "}
        {" "}
        <div className="flex flex-col md:flex-row ml-2 md:ml-5">
          {" "}
          <h1 className="text-2xl md:text-3xl text-yellow-500 text-border font-bold">
            Robot
          </h1>{" "}
          <h1 className="text-2xl md:text-3xl text-cyan-500 text-border font-bold">
            Crafters
          </h1>{" "}
        </div>{" "}
        <nav className="ml-auto flex gap-4 md:gap-12 text-sm md:text-lg font-semibold mr-11">
          {" "}
          <NavLink
            to=""
            className={({ isActive }) =>
              `${
                isActive ? "text-yellow-400" : "text-black lg:text-white md:text-white "
              } hover:	#00fefc` 
          
            }
          >
            {" "}
            Home{" "}
          </NavLink>{" "}
          <NavLink
            to="filter"
            className={({ isActive }) =>
              `${
                isActive ? "text-yellow-400" : "text-black lg:text-white md:text-white "
              }`
            }
          >
            {" "}
            Filters{" "}
          </NavLink>{" "}

        </nav>
      </header>
    </>
  );
};

export default Header;
