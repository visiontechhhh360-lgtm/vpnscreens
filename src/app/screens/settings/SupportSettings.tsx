import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  User,
  CreditCard,
  Smartphone,
  Star,
  MessageCircle,
  Book,
  ChevronRight,
} from "lucide-react";

export function SupportSettings() {
  const navigate = useNavigate();

  const items = [
    {
      icon: User,
      label: "Account",
      description: "Manage your account",
      color: "#22C55E",
      action: () => navigate("/account"),
    },
    {
      icon: CreditCard,
      label: "Subscription",
      description: "View plans & billing",
      color: "#3B82F6",
      action: () => navigate("/subscription"),
    },
    {
      icon: Smartphone,
      label: "Setup Devices",
      description: "Install on other devices",
      color: "#8B5CF6",
      action: () => navigate("/setup-devices"),
    },
    {
      icon: Star,
      label: "Rate Us",
      description: "Share your feedback",
      color: "#F59E0B",
      action: () => navigate("/rate-us"),
    },
    {
      icon: MessageCircle,
      label: "Contact Support",
      description: "Get help from our team",
      color: "#EC4899",
      action: () => navigate("/contact-support"),
    },
    {
      icon: Book,
      label: "Help Center",
      description: "FAQs and guides",
      color: "#06B6D4",
      action: () => navigate("/help-center"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={item.action}
            className="w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/50 flex items-center justify-between shadow-lg"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div className="text-left">
                <p className="text-[#0F172A] font-medium">{item.label}</p>
                <p className="text-sm text-[#64748B]">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#64748B]" />
          </motion.button>
        );
      })}

      {/* App Version */}
      <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] text-center">
        <p className="text-sm text-[#64748B]">PureVPN VT</p>
        <p className="text-xs text-[#64748B] mt-1">Version 1.0.0</p>
      </div>
    </motion.div>
  );
}