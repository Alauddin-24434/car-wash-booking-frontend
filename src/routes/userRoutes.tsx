
import MainLayout from "../layout/Mainlayout";
import ProtectedRoute from "../layout/ProtectedRoute";
import Login from "../pages/Login/Login";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Services from "../pages/Services/Services";
import Signup from "../pages/Signup/Signup";
import DashboardLayout from "../layout/DashboardLayout";
import UserDashboard from "../pages/DashboardPage/UserDashboard/UserDashboard";
import BookingSlot from "../pages/BookingSlot/BookingSlot";
import Payment from "../pages/Payment/Payment";
import ServiceSlotCountdown from "../pages/DashboardPage/UserDashboard/ServiceSlotCountdown/ServiceSlotCountdown";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Reviews from "../pages/Reviews/Reviews";
import Home from "../pages/Home/Home";


export const userRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/serviceDetails/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/bookingSlot/:id",
        element: (
          <ProtectedRoute role={["user", "admin"]}>
            <BookingSlot />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking-page",
        element: <Payment />,
      },
     
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/user-dashboard",
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/service-slot-coundown",
        element: (
          <ProtectedRoute role="user">
            <ServiceSlotCountdown />
          </ProtectedRoute>
        ),
      },
    ],
  },
 
];
