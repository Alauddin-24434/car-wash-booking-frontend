import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import MainLayout from "../layout/Mainlayout";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AddService from "../pages/AddService/AddService";
import ServiceManagement from "../pages/ServiceManagement/ServiceManagement";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/dashboard/service-Management',
        element: <ServiceManagement/>
      },
      {
        path: '/dashboard/addService',
        element: <AddService />
      }
    ]
  }
]);
