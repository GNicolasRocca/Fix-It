import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/users/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;
  return <Outlet />;
}
