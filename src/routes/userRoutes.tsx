import App from "../App";
import MainLayout from "../layout/Mainlayout";
import BookingPage from "../pages/BookingPage/BookingPage";
import Login from "../pages/Login/Login";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Services from "../pages/Services/Services";
import Signup from "../pages/Signup/Signup";

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
    }
  ];
  