import React from "react";
import { Icon } from "@iconify/react";
import userAvatar from "../../assets/logo.png";

export default function Navbar() {
  return (
    <>
      <nav className="shadow h-auto bg-white md:fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6 py-3">
        <div className="text-xl font-semibold text-gray-800">Overview</div>

        <form className="hidden md:flex items-center relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Icon icon="ic:baseline-search" className="text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search for something"
            className="w-full pl-10 py-2 rounded-full bg-gray-100 focus:bg-white border-none outline-none text-sm placeholder-gray-400"
          />
        </form>
        <div className="flex items-center space-x-4">
          <Icon
            icon="ic:baseline-settings"
            className="text-gray-400 hover:text-gray-700 cursor-pointer text-xl"
          />
          <Icon
            icon="mdi:bell-outline"
            className="text-pink-500 hover:text-pink-700 cursor-pointer text-xl"
          />
          <img
            src={userAvatar}
            alt="User"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        </div>
      </nav>
    </>
  );
}
