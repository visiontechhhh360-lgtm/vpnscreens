import { motion } from "motion/react";
import { Switch } from "../../components/ui/switch";
import { Shield, Zap, Bell, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

export function GeneralSettings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Auto Connect */}
      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border-2 border-border flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-foreground font-medium">Auto Connect</p>
            <p className="text-sm text-muted-foreground">Connect automatically on startup</p>
          </div>
        </div>
        <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
      </div>

      {/* Kill Switch */}
      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border-2 border-border flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div>
            <p className="text-foreground font-medium">Kill Switch</p>
            <p className="text-sm text-muted-foreground">Block internet if VPN drops</p>
          </div>
        </div>
        <Switch checked={killSwitch} onCheckedChange={setKillSwitch} />
      </div>

      {/* Notifications */}
      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border-2 border-border flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-foreground font-medium">Notifications</p>
            <p className="text-sm text-muted-foreground">Receive connection alerts</p>
          </div>
        </div>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </div>

      {/* Dark Mode Toggle */}
      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border-2 border-border flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
            {theme === "dark" ? (
              <Moon className="w-5 h-5 text-[#F59E0B]" />
            ) : (
              <Sun className="w-5 h-5 text-[#F59E0B]" />
            )}
          </div>
          <div>
            <p className="text-foreground font-medium">Dark Mode</p>
            <p className="text-sm text-muted-foreground">
              {theme === "dark" ? "Dark mode active" : "Light mode active"}
            </p>
          </div>
        </div>
        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div>

      {/* Logout */}
      <motion.button
        onClick={handleLogout}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between mt-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
            <LogOut className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="text-left">
            <p className="text-foreground font-medium">Logout</p>
            <p className="text-sm text-muted-foreground">Sign out of your account</p>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}