import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { useState } from "react";
import { menuItems } from "./NavMenuItems";
import { IoSearch } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string | undefined) => {
    if (id) {
      setActiveDropdown((prevId) => (prevId === id ? null : id));
    }
  };

  return (
    <nav className="shadow-md">
      {/* Top Section: Location, Contact Info, Icons */}
      <div className="bg-[#0E111B]">
        <div className="flex justify-between items-center py-3 max-w-7xl mx-auto p-4">
          <div className="flex space-x-6 text-slate-300 text-sm ">
            <p className="flex items-center gap-1">
              {" "}
              <FaLocationDot className="text-white" /> 13th Parks Suite 559,
              Denver
            </p>
            <p className="flex items-center gap-1">
              {" "}
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
            <span className="flex  items-center gap-0 font-bold">
              <img src={logo} alt="Logo" className="h-8 w-14" />
              <p className="uppercase text-[#424649]">wash</p>
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
                      className="flex items-center px-2 py-1 text-sm font-medium hover:text-black/80"
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
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100 hover:text-blue-800"
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
                    className="px-2 py-1 text-sm font-medium hover:text-black/80"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Search Icon */}
        <div className="flex-shrink-0">
          <span className="text-[#424649] hover:text-black/80">
            <IoSearch size={24} />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
