import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Check, AppWindow } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { Input } from "../../components/ui/input";

interface App {
  id: string;
  name: string;
  icon: string;
  package: string;
}

const AVAILABLE_APPS: App[] = [
  { id: "1", name: "WhatsApp", icon: "💬", package: "com.whatsapp" },
  { id: "2", name: "Instagram", icon: "📷", package: "com.instagram.android" },
  { id: "3", name: "Facebook", icon: "👥", package: "com.facebook.katana" },
  { id: "4", name: "Twitter (X)", icon: "🐦", package: "com.twitter.android" },
  { id: "5", name: "Netflix", icon: "🎬", package: "com.netflix.mediaclient" },
  { id: "6", name: "YouTube", icon: "▶️", package: "com.google.android.youtube" },
  { id: "7", name: "Spotify", icon: "🎵", package: "com.spotify.music" },
  { id: "8", name: "Gmail", icon: "✉️", package: "com.google.android.gm" },
  { id: "9", name: "Chrome", icon: "🌐", package: "com.android.chrome" },
  { id: "10", name: "Telegram", icon: "✈️", package: "org.telegram.messenger" },
  { id: "11", name: "TikTok", icon: "🎵", package: "com.zhiliaoapp.musically" },
  { id: "12", name: "Snapchat", icon: "👻", package: "com.snapchat.android" },
  { id: "13", name: "Reddit", icon: "🔴", package: "com.reddit.frontpage" },
  { id: "14", name: "Discord", icon: "💬", package: "com.discord" },
  { id: "15", name: "Zoom", icon: "📹", package: "us.zoom.videomeetings" },
  { id: "16", name: "Slack", icon: "💼", package: "com.slack" },
  { id: "17", name: "Amazon", icon: "📦", package: "com.amazon.mShop.android" },
  { id: "18", name: "Uber", icon: "🚗", package: "com.ubercab" },
  { id: "19", name: "Maps", icon: "🗺️", package: "com.google.android.apps.maps" },
  { id: "20", name: "Banking App", icon: "🏦", package: "com.bank.mobile" },
];

export function SplitTunnelingScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [excludedApps, setExcludedApps] = useState<Set<string>>(new Set());

  const filteredApps = AVAILABLE_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleApp = (appId: string) => {
    const newExcluded = new Set(excludedApps);
    if (newExcluded.has(appId)) {
      newExcluded.delete(appId);
    } else {
      newExcluded.add(appId);
    }
    setExcludedApps(newExcluded);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/main/settings")}
            className="p-2 bg-card/80 backdrop-blur-sm rounded-full shadow-sm border border-border"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-foreground">Split Tunneling</h1>
            <p className="text-sm text-muted-foreground">
              {excludedApps.size} app{excludedApps.size !== 1 ? "s" : ""} excluded
            </p>
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-xl p-4 mb-4"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AppWindow className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">What is Split Tunneling?</p>
              <p className="text-sm text-muted-foreground">
                Select apps that will bypass the VPN connection and use your regular internet.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-4"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </motion.div>

        {/* Apps List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredApps.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No apps found</p>
            </motion.div>
          ) : (
            filteredApps.map((app, index) => {
              const isExcluded = excludedApps.has(app.id);
              return (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.02 }}
                  onClick={() => toggleApp(app.id)}
                  className={`w-full bg-card rounded-xl p-4 border transition-all ${
                    isExcluded
                      ? "border-[#22C55E] shadow-md shadow-green-500/10"
                      : "border-border"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {app.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-foreground font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.package}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isExcluded
                          ? "bg-[#22C55E] border-[#22C55E]"
                          : "border-border"
                      }`}
                    >
                      {isExcluded && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Save Button */}
        {excludedApps.size > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => navigate("/main/settings")}
            className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl p-4 font-medium shadow-xl shadow-green-500/30 mt-4"
            whileTap={{ scale: 0.98 }}
          >
            Save Selection ({excludedApps.size} app{excludedApps.size !== 1 ? "s" : ""})
          </motion.button>
        )}
      </div>
    </div>
  );
}
