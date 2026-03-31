import { Outlet, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { BottomNavigation } from "../components/BottomNavigation";
import { PhoneFrame } from "../components/PhoneFrame";

export function MainLayout() {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <BottomNavigation />
      </div>
    </PhoneFrame>
  );
}