import { useLocation, useNavigate } from "react-router";
import { Globe, Home, Settings } from "lucide-react";
import { motion } from "motion/react";

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "servers", icon: Globe, label: "Servers", path: "/servers" },
    { id: "home", icon: Home, label: "Home", path: "/home" },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-20 bg-white border-t border-[#E2E8F0] flex items-center justify-around px-8 pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;

        return (
          <motion.button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 relative"
            whileTap={{ scale: 0.97 }}
          >
            <div
              className={`p-2 rounded-full transition-colors ${
                isActive ? "bg-[#22C55E]/10" : ""
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? "text-[#22C55E]" : "text-[#64748B]"
                }`}
              />
            </div>
            <span
              className={`text-xs transition-colors ${
                isActive ? "text-[#22C55E]" : "text-[#64748B]"
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-2 w-8 h-1 bg-[#22C55E] rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
