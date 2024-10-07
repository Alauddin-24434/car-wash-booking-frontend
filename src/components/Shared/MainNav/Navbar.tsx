import logo from "/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useCurrentUser from "../../../utils/hooks/useCurrentUser";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import Container from "../Container/Container";
import { GrCheckboxSelected } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  const { userData } = useCurrentUser();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white tracking-wide shadow-md">
    <Container>


        <div className="  font-[sans-serif]  relative z-50 max-w-7xl mx-auto">
            
    

     <section className="flex items-center flex-wrap lg:justify-between gap-4 py-3 sm:px-10 px-4 border-gray-200 border-b min-h-[75px] ">
        <span className="shrink-0">
       
          <NavLink
                to={"/"}
               
              >
                <img src={logo} alt="logo" className="w-24 h-12 bg-gray-100 border rounded-lg" />
              </NavLink>
        </span>

        {/* nabar top right icon */}
        <div className="lg:absolute lg:right-10 flex items-center ml-auto space-x-8">
          {/* <span className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block"
              viewBox="0 0 512 512"
            >
              <path
                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                data-original="#000000"
              ></path>
            </svg>
            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
              4
            </span>
          </span> */}

          {!userData ? (
            <>
              <button
                onClick={handleLogin}
                className="bg-[#007bff] hover:bg-blue-500  text-gray-100 px-4 p-1 rounded-md"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <div className="group  max-lg:px-3 max-lg:py-3 relative">
                <div className="block">
                  <div className="inline relative">
                    <button
                      type="button"
                      className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
                    >
                      <div className="pl-1">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            fill: "none",
                            height: "16px",
                            width: "16px",
                            stroke: "currentColor", // camelCase for "currentcolor"
                            strokeWidth: 3, // camelCase and number value for "stroke-width"
                            overflow: "visible",
                          }}
                        >
                          <g fill="none" fill-rule="nonzero">
                            <path d="m2 16h28"></path>
                            <path d="m2 24h28"></path>
                            <path d="m2 8h28"></path>
                          </g>
                        </svg>
                      </div>

                      <div className="block flex-grow-0 flex-shrink-0 h-4 md:h-10 lg:h-10  w-12 pl-5">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: "100%",
                            width: "100%",
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
                <ul className="absolute top-16 right-0 max-lg:top-16  z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                  {/* user */}

                  <div className="relative ml-4 ">
                    <>
                      {userData?.role === "admin" && (
                        <>
                          {/* admin */}
                          <li className="border-b py-3">
                            <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
                            <MdDashboard />
                              <Link to={"/dashboard/admin-dashboard"}>
                                Dashbord
                              </Link>
                            </span>
                          </li>
                        </>
                      )}

                      {userData?.role === "user" && (
                        <>
                          <li className="border-b py-3">
                            <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
                            <MdDashboard />
                              <Link to={"/dashboard/user-dashboard"}>
                                Dashbord
                              </Link>
                            </span>
                          </li>
                        </>
                      )}
                      <li className="border-b py-3">
                        <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
                        <RiLogoutBoxLine />
                          <button onClick={handleLogout}>Logout</button>
                        </span>
                      </li>
                    </>
                  </div>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>

      {/* navigation */}
      <div className="flex flex-wrap justify-center px-10 py-4 relative">
        <ul className="flex lg:gap-x-10  max-lg:bg-white  ">
          <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
            <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold block text-[15px]">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-[#007bff]" : ""
                }
              >
                Home
              </NavLink>
            </span>
          </li>
          <li className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative">
            <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block">
              Pages
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                className="ml-1 inline-block"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                  data-name="16"
                  data-original="#000000"
                />
              </svg>
            </span>
            <ul className="absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
              <li className="border-b py-3">
                <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
             < GrCheckboxSelected />
                  <Link to={"/booking-page"}> Booking Page</Link>
                </span>
              </li>
              <li className="border-b py-3">
                <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
              < VscOpenPreview/>
                  <NavLink
                    to={"/reviews"}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "text-[#007bff]" : ""
                    }
                  >
                    Reviews Page
                  </NavLink>
                </span>
              </li>
              <li className="border-b py-3">
                <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
                <FiLogIn />

                  <NavLink
                    to={"/signup"}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "text-[#007bff]" : ""
                    }
                  >
                    Signup Page
                  </NavLink>
                </span>
              </li>
              <li className="border-b py-3">
                <span className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] flex items-center gap-2">
                <FiLogIn />
                  <NavLink
                    to={"/login"}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "text-[#007bff]" : ""
                    }
                  >
                    Login Page
                  </NavLink>
                </span>
              </li>
            </ul>
          </li>
          <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
            <span className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block">
              <NavLink
                to={"/services"}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-[#007bff]" : ""
                }
              >
                Services
              </NavLink>
            </span>
          </li>
        </ul>
      </div>
 

    </div>
    </Container>
    </header>
  );
};

export default Navbar;
