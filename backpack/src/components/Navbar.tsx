import { useState } from "react";
import pfp from "../public/erna.jpg";
import logo from "../public/mountain.png";
import search from "../public/search.png"

/* Profile picture made from user specific */


export default function Navbar() {
  return (
    <nav className=" bg-primary-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded-b shadow-2xl">
      <div className="container flex flex-wrap items-center justify-between mx-auto">

        {/* Logo and title */}
        <a href="/" className="flex items-center">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">Wanderlust</span>
        </a>


        <button className="flex flex-row group">
          <IconSearch/>
          <input className="ml-2 border-none p-2 scale-0 group-hover:scale-100 transition-all duration-300 origin-left" placeholder="Search..."/>
        </button>


        {/* Profile picture: make this clickable */}
        <div className="flex items-center md:order-2">
        <img className="w-8 h-8 rounded-full" src={pfp} alt="user photo" />
        </div>


        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-primary-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                <li><a href="#" className="block py-2 pl-3 pr-4 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0" aria-current="page">Home</a></li>
                <li><a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About</a></li>
                <li><a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Trips</a></li>
            </ul>
        </div>



      </div>
    </nav>
  );
}

function IconSearch() {
  return (
    <svg
      className="group-hover:text-primary-200 hover:bg-primary-700 rounded-full group-hover:bg-primary-700 "
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="2rem"
      width="2rem"
    >
      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
    </svg>
  );
}