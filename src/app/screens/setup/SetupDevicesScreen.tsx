import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Monitor, Smartphone, Tablet, Wifi, ChevronRight } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function SetupDevicesScreen() {
  const navigate = useNavigate();

  const devices = [
    {
      icon: Monitor,
      name: "Windows",
      description: "Desktop & Laptop",
      color: "#3B82F6",
      steps: [
        "Download the Windows installer",
        "Run the setup file",
        "Login with your account",
        "Connect to a server",
      ],
    },
    {
      icon: Smartphone,
      name: "Android",
      description: "Mobile & Tablet",
      color: "#22C55E",
      steps: [
        "Download from Google Play Store",
        "Install and open the app",
        "Login with your account",
        "Connect to a server",
      ],
    },
    {
      icon: Tablet,
      name: "iOS",
      description: "iPhone & iPad",
      color: "#64748B",
      steps: [
        "Download from App Store",
        "Install and open the app",
        "Login with your account",
        "Connect to a server",
      ],
    },
    {
      icon: Wifi,
      name: "Router",
      description: "Whole network protection",
      color: "#8B5CF6",
      steps: [
        "Login to your router admin panel",
        "Navigate to VPN settings",
        "Enter provided configuration",
        "Save and connect",
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/main/settings")} className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
        </button>
        <div>
          <h1 className="text-2xl text-[#0F172A]">Setup Devices</h1>
          <p className="text-sm text-[#64748B]">Install VPN on other devices</p>
        </div>
      </div>

      {/* Devices List */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {devices.map((device, index) => {
          const Icon = device.icon;
          return (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
            >
              <button className="w-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${device.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: device.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-[#0F172A] font-medium">{device.name}</p>
                    <p className="text-sm text-[#64748B]">{device.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#64748B]" />
              </button>

              {/* Steps */}
              <div className="px-4 pb-4 border-t border-[#E2E8F0] pt-4">
                <p className="text-sm text-[#64748B] mb-3">Setup Steps:</p>
                <ol className="space-y-2">
                  {device.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white"
                        style={{ backgroundColor: device.color }}
                      >
                        {stepIndex + 1}
                      </div>
                      <p className="text-sm text-[#0F172A] pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#3B82F6]/10 rounded-xl p-4 border border-[#3B82F6]/20"
      >
        <p className="text-sm text-[#0F172A]">
          <strong>Need help?</strong> Contact our support team for detailed setup instructions.
        </p>
      </motion.div>
      </div>
    </div>
  );
}