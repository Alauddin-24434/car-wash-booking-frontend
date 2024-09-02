import DashboardLayout from "../layout/DashboardLayout";

import ServiceManagement from "../pages/DashboardPage/AdminDashboard/ServiceManagement/ServiceManagement";

import ProtectedRoute from "../layout/ProtectedRoute";
import UserManagement from "../pages/UserManagement/UserManagement";
import SlotManagement from "../pages/DashboardPage/AdminDashboard/SlotManagement/SlotManagement";
import AdminDashboard from "../pages/DashboardPage/AdminDashboard/AdminDashboard";

export const adminRoutes = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard/admin-dashboard',
        element:   (
          <ProtectedRoute role="admin">
            <AdminDashboard/>
          </ProtectedRoute>
        )
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
        path: '/dashboard/user-management',
        element: (
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        )
      },
      {
        path: '/dashboard/slot-management',
        element: (
          <ProtectedRoute role="admin">
            <SlotManagement />
          </ProtectedRoute>
        )
      }
    ]
  }
];
