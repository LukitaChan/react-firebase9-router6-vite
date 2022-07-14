import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UseProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const handleClickLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const buttonBlue =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const buttonRed =
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";
  const buttonPink =
    "text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800";
  const buttonPurple =
    "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-blue-800";

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            URLShort API
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <NavLink to="/" className={buttonBlue}>
                Inicio
              </NavLink>
              <button onClick={handleClickLogout} className={buttonRed}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={buttonPink}>
                Login
              </NavLink>
              <NavLink to="/register" className={buttonPurple}>
                Registro
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
