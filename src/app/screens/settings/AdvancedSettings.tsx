import { useState } from "react";
import { motion } from "motion/react";
import { Switch } from "../../components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import {
  Settings as SettingsIcon,
  Network,
  ToggleRight,
  RefreshCw,
  AppWindow,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useVPN } from "../../contexts/VPNContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function AdvancedSettings() {
  const navigate = useNavigate();
  const { status } = useVPN();
  const [protocol, setProtocol] = useState("automatic");
  const [autoPort, setAutoPort] = useState(true);
  const [fallbackConnection, setFallbackConnection] = useState(true);
  const [showPortModal, setShowPortModal] = useState(false);
  const [showReconnectModal, setShowReconnectModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [customPort, setCustomPort] = useState("");

  const handleProtocolChange = (value: string) => {
    if (status === "connected") {
      setShowReconnectModal(true);
    } else {
      setProtocol(value);
      toast.success("Protocol updated");
    }
  };

  const handleConfirmReconnect = () => {
    setProtocol("wireguard"); // Example
    setShowReconnectModal(false);
    toast.success("Settings updated. Reconnecting...");
  };

  const handlePortSubmit = () => {
    if (!customPort) {
      toast.error("Please enter a port number");
      return;
    }
    toast.success(`Custom port ${customPort} set`);
    setShowPortModal(false);
  };

  const handleClearPreferences = () => {
    toast.success("Preferences cleared");
    setShowClearModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Connection Protocols */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
            <Network className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-foreground font-medium">Connection Protocol</p>
            <p className="text-sm text-muted-foreground">Select VPN protocol</p>
          </div>
        </div>

        <RadioGroup value={protocol} onValueChange={handleProtocolChange}>
          <div className="space-y-3">
            {[
              { value: "automatic", label: "Automatic", description: "Best for most users" },
              { value: "openvpn-udp", label: "OpenVPN UDP", description: "Fast & reliable" },
              { value: "openvpn-tcp", label: "OpenVPN TCP", description: "Stable connection" },
              { value: "ikev2", label: "IKEv2", description: "Mobile-optimized" },
              { value: "wireguard", label: "WireGuard", description: "Modern & fast" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-2 rounded-lg">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <p className="text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Automatic Port */}
      <div className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
            <ToggleRight className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-foreground font-medium">Automatic Port</p>
            <p className="text-sm text-muted-foreground">Auto-select best port</p>
          </div>
        </div>
        <Switch checked={autoPort} onCheckedChange={setAutoPort} />
      </div>

      {/* Port Selection */}
      <button
        onClick={() => setShowPortModal(true)}
        className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div className="text-left">
            <p className="text-foreground font-medium">Port Selection</p>
            <p className="text-sm text-muted-foreground">Set custom port</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Fallback Connection */}
      <div className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-foreground font-medium">Fallback Connection</p>
            <p className="text-sm text-muted-foreground">Auto-retry on failure</p>
          </div>
        </div>
        <Switch checked={fallbackConnection} onCheckedChange={setFallbackConnection} />
      </div>

      {/* Split Tunneling */}
      <button
        onClick={() => navigate("/main/split-tunneling")}
        className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EC4899]/10 rounded-full flex items-center justify-center">
            <AppWindow className="w-5 h-5 text-[#EC4899]" />
          </div>
          <div className="text-left">
            <p className="text-foreground font-medium">Split Tunneling</p>
            <p className="text-sm text-muted-foreground">Select apps to exclude</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Clear Preferences */}
      <button
        onClick={() => setShowClearModal(true)}
        className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="text-left">
            <p className="text-foreground font-medium">Clear Preferences</p>
            <p className="text-sm text-muted-foreground">Reset all settings</p>
          </div>
        </div>
      </button>

      {/* Port Modal */}
      <Dialog open={showPortModal} onOpenChange={setShowPortModal}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>Custom Port</DialogTitle>
            <DialogDescription>Enter a custom port number</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="number"
              value={customPort}
              onChange={(e) => setCustomPort(e.target.value)}
              placeholder="e.g., 8080"
              className="w-full h-12 px-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowPortModal(false)}
                className="flex-1 h-12 rounded-lg border border-border text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handlePortSubmit}
                className="flex-1 h-12 bg-[#22C55E] text-white rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reconnect Modal */}
      <Dialog open={showReconnectModal} onOpenChange={setShowReconnectModal}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>Reconnect Required</DialogTitle>
            <DialogDescription>
              Changing protocol requires reconnection. Continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <button
              onClick={() => setShowReconnectModal(false)}
              className="flex-1 h-12 rounded-lg border border-border text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReconnect}
              className="flex-1 h-12 bg-[#22C55E] text-white rounded-lg"
            >
              Reconnect
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear Modal */}
      <Dialog open={showClearModal} onOpenChange={setShowClearModal}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>Clear Preferences</DialogTitle>
            <DialogDescription>
              This will reset all settings to default. Continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <button
              onClick={() => setShowClearModal(false)}
              className="flex-1 h-12 rounded-lg border border-border text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleClearPreferences}
              className="flex-1 h-12 bg-[#EF4444] text-white rounded-lg"
            >
              Clear
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}