import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { MapPin, Download, Upload, Globe, ChevronRight } from "lucide-react";
import { useVPN } from "../../contexts/VPNContext";
import { ConnectButton } from "../../components/ConnectButton";
import { toast } from "sonner";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { AppHeader } from "../../components/AppHeader";

export function HomeScreen() {
  const navigate = useNavigate();
  const { status, selectedServer, connectionTime, downloadSpeed, uploadSpeed, currentIP } =
    useVPN();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(currentIP);
      toast.success("IP address copied!");
    } catch (error) {
      toast.error("Failed to copy IP");
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant={status === "connected" ? "green" : "default"} />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-24">
      {/* App Name Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <AppHeader />
      </motion.div>

      {/* Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl text-foreground mb-1">
          {status === "connected" ? "You're Protected!" : "Not Protected"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {status === "connected"
            ? "Your connection is secure and encrypted"
            : "Connect to a VPN server to secure your connection"}
        </p>
      </motion.div>

      {/* Location Selector */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onClick={() => navigate("/main/servers")}
        className="bg-card/90 backdrop-blur-sm rounded-xl p-4 mb-8 shadow-lg border-2 border-border flex items-center justify-between"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-foreground font-medium">
              {selectedServer?.flag} {selectedServer?.country}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </motion.button>

      {/* Connect Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex items-center justify-center"
      >
        <ConnectButton />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {/* Timer */}
        {status === "connected" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-border text-center"
          >
            <p className="text-xs text-muted-foreground mb-1">Connection Time</p>
            <p className="text-xl text-foreground font-medium">{formatTime(connectionTime)}</p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-border">
            <Download className="w-5 h-5 text-[#22C55E] mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Download</p>
            <p className="text-sm text-foreground font-medium">{downloadSpeed}</p>
          </div>

          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-border">
            <Upload className="w-5 h-5 text-[#3B82F6] mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Upload</p>
            <p className="text-sm text-foreground font-medium">{uploadSpeed}</p>
          </div>

          <motion.button
            onClick={handleCopyIP}
            whileTap={{ scale: 0.95 }}
            className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-border text-left"
          >
            <Globe className="w-5 h-5 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground mb-1">IP Address</p>
            <p className="text-xs text-foreground font-medium truncate">{currentIP}</p>
          </motion.button>
        </div>
      </motion.div>
      </div>
    </div>
  );
}