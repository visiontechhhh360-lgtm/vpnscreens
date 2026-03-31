import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { VPNProvider } from "./contexts/VPNContext";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <AuthProvider>
      <VPNProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </VPNProvider>
    </AuthProvider>
  );
}
