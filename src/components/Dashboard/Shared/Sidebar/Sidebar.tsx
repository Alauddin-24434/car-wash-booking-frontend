import { NavLink } from 'react-router-dom';
import Logo from '/images/logo.png';
import { useAppSelector } from '../../../../redux/hooks';
import { useCurrentToken } from '../../../../redux/features/auth/authSlice';
import { verifyToken } from '../../../../utils/VerifyToken';
import { SidebarProps, User } from './types'; // Adjust the import path accordingly

// Import React Icons
import { FaHome, FaCog, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = ({ sidebarOpen}: SidebarProps) => {
  // Use selector to get the token
  const token = useAppSelector(useCurrentToken);

  // Verify the token and get user details
  let user: User | undefined;
  if (token) {
    user = verifyToken(token);
  }

  // Define user roles
  const userRole = {
    ADMIN: 'admin',
    USER: 'user',
  };

  // Define sidebar items based on user role
  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = (
        <>
          <li>
            <NavLink
              to="/dashboard/admin-dashboard"
              className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black'
                }`
              }
            >
              <FaHome className="w-6 h-6" />
              Admin Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/service-management"
              className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black'
                }`
              }
            >
              <FaCog className="w-6 h-6" />
              Service Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/slot-management"
              className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black'
                }`
              }
            >
              <FaCalendarAlt className="w-6 h-6" />
              Slot Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user-management"
              className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black'
                }`
              }
            >
              <FaUsers className="w-6 h-6" />
              User Management
            </NavLink>
          </li>
        </>
      );
      break;

    case userRole.USER:
      sidebarItems = (
        <>
          <li>
            <NavLink
              to="/dashboard/user-Dashboard"
              className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black'
                }`
              }
            >
              <FaHome className="w-6 h-6" />
              User Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/service-slot-coundown"
              className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black'
                }`
              }
            >
              <FaHome className="w-6 h-6" />
              Service Slot Coundown
            </NavLink>
          </li>
        </>
      );
      break;

    default:
      sidebarItems = null;
      break;
  }

  return (
    <aside
      className={`absolute  top-0 z-40 flex h-screen shadow-lg flex-col overflow-y-hidden bg-slate-200 text-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <div className="flex items-center justify-center gap-2 py-5.5 lg:py-6.5">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          
        </button>
      </div> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="p-4">
          <div>
            <NavLink to="/">
              <div className=' mb-6'>
                <img src={Logo} alt="Logo" className="w-full h-16 border rounded-md bg-gray-700 text-white " />
              </div>
            </NavLink>
            <ul className="mb-6 flex flex-col gap-1.5">{sidebarItems}</ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
