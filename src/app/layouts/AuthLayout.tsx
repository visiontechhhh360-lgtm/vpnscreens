import { Outlet, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { PhoneFrame } from "../components/PhoneFrame";

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/main/home" replace />;
  }

  return (
    <PhoneFrame>
      <Outlet />
    </PhoneFrame>
  );
}