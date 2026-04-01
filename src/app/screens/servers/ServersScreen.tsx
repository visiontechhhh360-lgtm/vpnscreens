import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, ChevronRight, Check } from "lucide-react";
import { useVPN } from "../../contexts/VPNContext";
import { useNavigate } from "react-router";
import { servers } from "../../data/servers";
import { toast } from "sonner";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { AppHeader } from "../../components/AppHeader";

export function ServersScreen() {
  const navigate = useNavigate();
  const { selectedServer, selectServer, status } = useVPN();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const filteredServers = servers.filter((server) =>
    server.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectServer = (server: typeof servers[0]) => {
    selectServer(server);
    toast.success(`Connected to ${server.flag} ${server.country}`);
    navigate("/main/home");
  };

  const toggleExpand = (countryId: string) => {
    setExpandedCountry(expandedCountry === countryId ? null : countryId);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant="blue" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
      {/* App Name Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <AppHeader />
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl text-foreground mb-1">Select Server</h1>
        <p className="text-sm text-muted-foreground">Choose a location to connect</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-4"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search country..."
          className="w-full h-12 pl-12 pr-4 bg-card/90 backdrop-blur-sm border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all shadow-lg"
        />
      </motion.div>

      {/* Server List */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-4">
        {filteredServers.map((server, index) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Country Row */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{server.flag}</span>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{server.country}</p>
                    {server.ping && (
                      <p className="text-sm text-muted-foreground">{server.ping}ms</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedServer?.id === server.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}

                  {server.cities && server.cities.length > 0 && (
                    <motion.button
                      onClick={() => toggleExpand(server.id)}
                      className="p-1"
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ rotate: expandedCountry === server.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </motion.button>
                  )}

                  <motion.button
                    onClick={() => handleSelectServer(server)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedServer?.id === server.id
                        ? "bg-[#22C55E] text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {selectedServer?.id === server.id ? "Connected" : "Connect"}
                  </motion.button>
                </div>
              </div>

              {/* Expandable Cities */}
              <AnimatePresence>
                {expandedCountry === server.id && server.cities && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    {server.cities.map((city) => (
                      <motion.div
                        key={city.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 pl-12 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="text-foreground">{city.name}</p>
                          {city.ping && (
                            <p className="text-sm text-muted-foreground">{city.ping}ms</p>
                          )}
                        </div>
                        <motion.button
                          onClick={() => handleSelectServer(server)}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 rounded-full text-sm bg-muted text-foreground font-medium"
                        >
                          Connect
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
}