import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/VerifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | string[]; // Can be a string or an array of roles
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  // Ensure user role is defined and a string
  const userRole = user?.role;

  if (!userRole) {
    return <Navigate to="/login" replace={true} />;
  }

  // If role is a string (single role), check against userRole
  if (typeof role === "string" && role !== userRole) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  // If role is an array, check if userRole is included in the array
  if (Array.isArray(role) && !role.includes(userRole)) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
