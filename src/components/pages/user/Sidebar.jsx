
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const location = useLocation(); // Hook to get the current route

  // Function to check if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="md:left-0 z-40 sm:fixed fixed sm:w-full md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-col justify-between w-full mx-auto h-full">
          {/* Toggler */}
          <div className="md:hidden flex justify-between">
          <button
            className="cursor-pointer text-primary md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <Icon icon="ri:menu-2-fill" />
          </button>
          <div className="relative">
            <Link className="navbar-brand flex m-0" to="/">
              <img src={logo} className="h-20 sm:h-10" alt="main_logo" />
            </Link>
          </div>
          <div className="mt-auto">
            <ul className="md:flex-col text-base font-medium md:min-w-full text-primary flex flex-col list-none">
              <li
                className="font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <Link to="/userlogout" className="flex items-center text-red-500">
                  <Icon
                    icon="material-symbols:logout"
                    width="24"
                    height="24"
                    className="mr-3 text-lg"
                  />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          </div>

          {/* Brand */}
          <div className="relative sm:hidden">
            <Link className="navbar-brand flex m-0" to="/">
              <img src={logo} className="h-20 sm:h-10" alt="main_logo" />
            </Link>
          </div>

          {/* Menu Items */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
           <ul className="md:flex-col text-base font-medium md:min-w-full text-primary flex flex-col list-none">
              {/* Dashboard */}
              <li
                className={`font-semibold px-4 py-2 mb-4 rounded-lg ${
                  isActive("/userdashboard")
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Link to="/userdashboard" className="flex items-center">
                  <Icon icon="ic:baseline-home" width="24" height="24" className="mr-3 text-lg" />
                  Dashboard
                </Link>
              </li>

              {/* Transactions */}
              <li
                className={`font-semibold px-4 py-2 mb-4 rounded-lg ${
                  isActive("/usertransactions")
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Link to="/usertransactions" className="flex items-center">
                  <Icon icon="vaadin:money-exchange" width="24" height="24" className="mr-3 text-lg"/>
                  Transactions
                </Link>
              </li>

              {/* Loans */}
              <li
                className={`font-semibold px-4 py-2 mb-4 rounded-lg ${
                  isActive("/userloans")
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Link to="/userloans" className="flex items-center">
                  <Icon icon="grommet-icons:money" width="24" height="24"  className="mr-3 text-lg"/>
                  Loans
                </Link>
              </li>

              
            </ul>
          </div>

          {/* Logout at the Bottom */}
          <div className="mt-auto sm:hidden">
            <ul className="md:flex-col text-base font-medium md:min-w-full text-primary flex flex-col list-none">
              <li
                className="font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <Link to="/logout" className="flex items-center text-red-500">
                  <Icon
                    icon="material-symbols:logout"
                    width="24"
                    height="24"
                    className="mr-3 text-lg"
                  />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
