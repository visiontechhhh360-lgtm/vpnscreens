import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  User,
  CreditCard,
  Smartphone,
  Star,
  MessageCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export function SupportSettings() {
  const navigate = useNavigate();

  const items = [
    {
      icon: User,
      title: "Account",
      description: "Manage your profile",
      color: "#22C55E",
      action: () => navigate("/main/account"),
    },
    {
      icon: CreditCard,
      title: "Subscription",
      description: "Manage your plan",
      color: "#3B82F6",
      action: () => navigate("/main/subscription"),
    },
    {
      icon: Smartphone,
      title: "Setup Devices",
      description: "Install on other devices",
      color: "#8B5CF6",
      action: () => navigate("/main/setup-devices"),
    },
    {
      icon: Star,
      title: "Rate Us",
      description: "Share your feedback",
      color: "#F59E0B",
      action: () => navigate("/main/rate-us"),
    },
    {
      icon: MessageCircle,
      title: "Contact Support",
      description: "Get help from our team",
      color: "#EC4899",
      action: () => navigate("/main/contact-support"),
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "FAQs and guides",
      color: "#06B6D4",
      action: () => navigate("/main/help-center"),
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
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={item.action}
            className="w-full bg-card/90 backdrop-blur-sm rounded-xl p-4 border-2 border-border flex items-center justify-between shadow-lg"
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
                <p className="text-foreground font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        );
      })}

      {/* App Version */}
      <div className="bg-card rounded-xl p-4 border border-border text-center">
        <p className="text-sm text-muted-foreground">PureVPN VT</p>
        <p className="text-xs text-muted-foreground mt-1">Version 1.0.0</p>
      </div>
    </motion.div>
  );
}