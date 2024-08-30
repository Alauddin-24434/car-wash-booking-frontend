import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import MainLayout from "../layout/Mainlayout";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AddService from "../pages/AddService/AddService";
import ServiceManagement from "../pages/ServiceManagement/ServiceManagement";
import ProtectedRoute from "../layout/ProtectedRoute";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/services',
        element: <Services/>
      },
      {
        path: '/serviceDetails',
        element: <ServiceDetails/>
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
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
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
