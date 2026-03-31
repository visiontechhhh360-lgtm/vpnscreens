import { motion } from "motion/react";
import { useVPN } from "../contexts/VPNContext";
import { Power } from "lucide-react";

export function ConnectButton() {
  const { status, connect, disconnect } = useVPN();

  const handleClick = () => {
    if (status === "disconnected") {
      connect();
    } else if (status === "connected") {
      disconnect();
    }
  };

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={handleClick}
        disabled={isConnecting}
        whileTap={!isConnecting ? { scale: 0.95 } : {}}
        className="relative"
      >
        {/* Multiple glow layers when connected */}
        {isConnected && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-[#22C55E] blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-[#22C55E] blur-2xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </>
        )}

        {/* Pulse animation when connecting */}
        {isConnecting && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-[#3B82F6] blur-2xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#3B82F6]"
              animate={{
                scale: [1, 1.3],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </>
        )}

        {/* Main button */}
        <motion.div
          className={`relative w-[150px] h-[150px] rounded-full flex items-center justify-center transition-all ${
            isConnected
              ? "bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-2xl shadow-[#22C55E]/50"
              : isConnecting
              ? "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-2xl shadow-[#3B82F6]/50"
              : "bg-white shadow-xl border-4 border-[#E2E8F0]"
          }`}
          animate={
            isConnecting
              ? {
                  rotate: [0, 360],
                }
              : {}
          }
          transition={
            isConnecting
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }
              : {}
          }
        >
          <motion.div
            animate={
              isConnected
                ? {
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Power
              className={`w-16 h-16 transition-colors ${
                isConnected || isConnecting ? "text-white" : "text-[#64748B]"
              }`}
            />
          </motion.div>
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-[#0F172A] font-medium">
          {isConnected
            ? "Tap to Disconnect"
            : isConnecting
            ? "Connecting..."
            : "Tap to Connect"}
        </p>
        {isConnected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-[#22C55E] flex items-center justify-center gap-1.5"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-[#22C55E] rounded-full"
            />
            Secure Connection Active
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}