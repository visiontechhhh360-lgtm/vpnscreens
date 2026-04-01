import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { VPNProvider } from "./contexts/VPNContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VPNProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
        </VPNProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}