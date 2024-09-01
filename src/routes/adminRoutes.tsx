import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ServiceManagement from "../pages/DashboardPage/ServiceManagement/ServiceManagement";
import AddService from "../pages/AddService/AddService";
import ProtectedRoute from "../layout/ProtectedRoute";

export const adminRoutes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/dashboard/service-management',
        element: (
          <ProtectedRoute role="admin">
            <ServiceManagement />
          </ProtectedRoute>
        )
      },
      {
        path: '/dashboard/add-service',
        element: (
          <ProtectedRoute role="admin">
            <AddService />
          </ProtectedRoute>
        )
      }
    ]
  }
];
