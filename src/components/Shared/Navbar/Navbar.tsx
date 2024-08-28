import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Container from "../../Shared/Container/Container";
import { useState } from "react";
import { menuItems } from "./NavMenuItems";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string | undefined) => {
    if (id) {
      setActiveDropdown((prevId) => (prevId === id ? null : id));
    }
  };

  return (
    <nav className="border bg-[#0E111B] shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4">
      <Container>
        <div className="flex w-full flex-wrap items-center justify-between">
        

          {/* Hamburger Button for Mobile View */}
          <button
            className="block border-0 bg-transparent px-2 text-[#fff] hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            aria-controls="navbarSupportedContent8"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              const element = document.getElementById("navbarSupportedContent8");
              if (element) {
                element.classList.toggle("hidden");
              }
            }}
          >
            <FaBars size={24} />
          </button>

          {/* Search Bar (for small screens) */}
          <span className="text-[#fff] block md:hidden lg:hidden hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 mr-4">
            <IoSearch />
          </span>

          {/* Collapsible Navbar Container */}
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center justify-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent8"
          >
            {/* Navigation Links */}
            <ul className="list-style-none flex flex-col ps-0 lg:mt-1 lg:flex-row">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2 relative"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        aria-expanded={activeDropdown === item.id}
                        className="p-0 text-[#fff] transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2 flex items-center"
                      >
                        {item.label}
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`${
                          activeDropdown === item.id ? "flex" : "hidden"
                        } absolute z-50 mt-6 w-44 bg-white  p-4`}
                      >
                        <ul className="w-full">
                          {item.columns?.[0]?.links.map((link) => (
                            <li key={link.path}>
                              <Link
                                to={link.path}
                                className="block w-full  px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100 hover:text-blue-800 dark:text-white dark:hover:bg-neutral-800"
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
                      className="text-[#fff] hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 lg:px-2"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

         
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;