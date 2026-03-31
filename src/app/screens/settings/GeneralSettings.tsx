import { useState } from "react";
import { motion } from "motion/react";
import { Switch } from "../../components/ui/switch";
import { Shield, Zap, Bell, Sun, ChevronRight } from "lucide-react";

export function GeneralSettings() {
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Auto Connect */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/50 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-[#0F172A] font-medium">Auto Connect</p>
            <p className="text-sm text-[#64748B]">Connect automatically on startup</p>
          </div>
        </div>
        <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
      </div>

      {/* Kill Switch */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/50 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div>
            <p className="text-[#0F172A] font-medium">Kill Switch</p>
            <p className="text-sm text-[#64748B]">Block internet if VPN drops</p>
          </div>
        </div>
        <Switch checked={killSwitch} onCheckedChange={setKillSwitch} />
      </div>

      {/* Notifications */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/50 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-[#0F172A] font-medium">Notifications</p>
            <p className="text-sm text-[#64748B]">Receive connection alerts</p>
          </div>
        </div>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </div>

      {/* Theme */}
      <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
            <Sun className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-[#0F172A] font-medium">Theme</p>
            <p className="text-sm text-[#64748B]">Light mode (active)</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#64748B]" />
      </div>
    </motion.div>
  );
}