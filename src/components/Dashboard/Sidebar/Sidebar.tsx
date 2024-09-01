import { useAppSelector } from '../../../redux/hooks';
import { TUser, useCurrentToken } from '../../../redux/features/auth/authSlice';
import { verifyToken } from '../../../utils/VerifyToken';
import { NavLink } from 'react-router-dom';
import Logo from '/images/logo.png'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
   
  }


  const userRole = {
    ADMIN: 'admin',
    USER: 'user',
  };

  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = (
        <>
          <li>
            <NavLink to="/dashboard" className="group relative flex items-center gap-2.5 text-white rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
              {/* Add Dashboard SVG Icon */}
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/service-Management" className="group relative flex items-center gap-2.5 text-white rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
              {/* Add Service Management SVG Icon */}
              Service Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-service" className="group relative flex items-center gap-2.5 text-white rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
              {/* Add Add Service SVG Icon */}
              Add Service
            </NavLink>
          </li>
        </>
      );
      break;

    case userRole.USER:
      sidebarItems = (
        <>
          <li>
            <NavLink to="/dashboard" className="group relative flex items-center gap-2.5 text-white rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
              {/* Add Dashboard SVG Icon */}
              Dashboard
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
    <aside className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" aria-expanded={sidebarOpen} className="block lg:hidden">
          {/* SVG Icon for Toggle */}
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm text-white font-semibold text-bodydark2">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarItems}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};


export default Sidebar;