import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { useState } from "react";
import { menuItems } from "./NavMenuItems";
import {  FaFacebookF, FaTwitter, FaYoutube, FaClock } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

import { FaLocationDot } from "react-icons/fa6";
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileDropdown, setProfileDropdown] = useState(false);


  const toggleDropdown = (id: string | undefined) => {
    if (id) {
      setActiveDropdown((prevId) => (prevId === id ? null : id));
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <nav className="shadow-md">
      {/* Top Section: Location, Contact Info, Icons */}
      <div className="bg-[#0E111B]">
        <div className="flex justify-between items-center py-3 max-w-7xl mx-auto p-4">
          <div className="flex space-x-6 text-slate-300 text-sm ">
            <p className="flex items-center gap-1">
              <FaLocationDot className="text-white" /> 13th Parks Suite 559,
              Denver
            </p>
            <p className="flex items-center gap-1">
              <IoCall className="text-white" /> +0 (555) 123 45 67
            </p>
            <p className="flex items-center gap-1">
              <FaClock className="text-white" />
              Mon - Sat: 07:00AM - 06:00PM
            </p>
          </div>
          <div className="flex space-x-4 text-slate-300">
            <span>
              <FaFacebookF size={20} />
            </span>
            <span>
              <FaTwitter size={20} />
            </span>
            <span>
              <FaYoutube size={20} />
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr />

      {/* Bottom Section: Navbar Links */}
      <div className="flex items-center justify-between py-5 max-w-7xl mx-auto ">
        {/* Left: Logo */}
        <div className="">
          <Link to="/">
            <span className="flex items-center gap-0 font-bold">
              <img src={logo} alt="Logo" className="h-8 w-14" />
              <p className="uppercase text-[#424649] hover:text-[#0068d8] active:text-[#0068d8]">
                wash
              </p>
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div
          className="hidden lg:flex w-full justify-center items-center"
          id="navbarSupportedContent8"
        >
          <ul className="flex space-x-6 text-[#424649]">
            {menuItems.map((item) => (
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      aria-expanded={activeDropdown === item.id}
                      className="flex items-center px-2 py-1 text-sm font-medium hover:text-[#0068d8] active:text-[#0068d8]"
                    >
                      {item.label}
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`${
                        activeDropdown === item.id ? "block" : "hidden"
                      } absolute z-50 mt-2 w-44 bg-white shadow-lg p-2`}
                    >
                      <ul>
                        {item.columns?.[0]?.links.map((link) => (
                          <li key={link.path}>
                            <Link
                              to={link.path}
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100 hover:text-blue-800 active:text-[#0068d8]"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path || "/"}
                    className="px-2 py-1 text-sm font-medium hover:text-[#0068d8] active:text-[#0068d8]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Search Icon and Profile Dropdown */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="relative flex border">
            <input
              type="search"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Search"
              aria-label="Search"
              id="search-input"
              aria-describedby="search-button"
            />
            <label
              htmlFor="search-input"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
            >
              Search
            </label>
            <button
              className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              type="button"
              id="search-button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center text-sm focus:outline-none"
            >
              <img
                src="/path-to-avatar.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {profileDropdown && (
              <div className="absolute right-0 z-50 mt-2 w-48 bg-white shadow-lg p-2 rounded-lg">
                <ul>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
