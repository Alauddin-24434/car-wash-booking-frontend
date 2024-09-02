import App from "../App";
import MainLayout from "../layout/Mainlayout";
import ProtectedRoute from "../layout/ProtectedRoute";
import BookingPage from "../pages/BookingPage/BookingPage";
import Login from "../pages/Login/Login";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Services from "../pages/Services/Services";
import Signup from "../pages/Signup/Signup";
import DashboardLayout from "../layout/DashboardLayout"; // Assuming you have these imports

import UserDashboard from "../pages/DashboardPage/UserDashboard/UserDashboard";

export const userRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/services',
        element: <Services/>
      },
      {
        path: '/serviceDetails/:id',
        element: <ServiceDetails/>
      },
      {
        path: '/booking',
        element: <BookingPage/>
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
    element:  <DashboardLayout />,
    

    children: [
      {
        path: '/dashboard/user-dashboard',
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
];
