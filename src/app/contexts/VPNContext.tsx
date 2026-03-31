import React, { createContext, useContext, useState, useEffect } from "react";

export interface Server {
  id: string;
  country: string;
  flag: string;
  ping?: number;
  cities?: {
    id: string;
    name: string;
    ping?: number;
  }[];
}

type VPNStatus = "disconnected" | "connecting" | "connected";

interface VPNContextType {
  status: VPNStatus;
  selectedServer: Server | null;
  connectionTime: number;
  downloadSpeed: string;
  uploadSpeed: string;
  currentIP: string;
  connect: () => void;
  disconnect: () => void;
  selectServer: (server: Server) => void;
}

const VPNContext = createContext<VPNContextType | undefined>(undefined);

export function VPNProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<VPNStatus>("disconnected");
  const [selectedServer, setSelectedServer] = useState<Server | null>({
    id: "us-new-york",
    country: "United States",
    flag: "🇺🇸",
    ping: 45,
  });
  const [connectionTime, setConnectionTime] = useState(0);
  const [downloadSpeed] = useState("0.00");
  const [uploadSpeed] = useState("0.00");
  const [currentIP, setCurrentIP] = useState("192.168.1.1");

  // Connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "connected") {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const connect = () => {
    if (status === "disconnected" && selectedServer) {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("connected");
        // Mock IP change
        setCurrentIP("104.28.12.45");
      }, 2000);
    }
  };

  const disconnect = () => {
    setStatus("disconnected");
    setCurrentIP("192.168.1.1");
  };

  const selectServer = (server: Server) => {
    setSelectedServer(server);
  };

  return (
    <VPNContext.Provider
      value={{
        status,
        selectedServer,
        connectionTime,
        downloadSpeed: status === "connected" ? "12.5 MB/s" : "0.00 MB/s",
        uploadSpeed: status === "connected" ? "3.2 MB/s" : "0.00 MB/s",
        currentIP,
        connect,
        disconnect,
        selectServer,
      }}
    >
      {children}
    </VPNContext.Provider>
  );
}

export function useVPN() {
  const context = useContext(VPNContext);
  if (context === undefined) {
    throw new Error("useVPN must be used within a VPNProvider");
  }
  return context;
}
