import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shield, Zap, Lock, Globe } from "lucide-react";

export function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, label: "Secure", delay: 0.2 },
    { icon: Zap, label: "Fast", delay: 0.4 },
    { icon: Lock, label: "Private", delay: 0.6 },
    { icon: Globe, label: "Global", delay: 0.8 },
  ];

  return (
    <div className="h-full w-full relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 w-80 h-80 bg-[#22C55E] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-16">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          {/* Logo with Pulse Animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-8"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#22C55E] rounded-full blur-2xl"
            />
            
            {/* Main Logo */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-[2.5rem] flex items-center justify-center shadow-2xl">
              <Shield className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-2">
              Pure<span className="text-[#22C55E]">VPN</span>
            </h1>
            <p className="text-xl text-white/60 font-light tracking-wider">VT</p>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-8 mt-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <span className="text-xs text-white/60">{feature.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full space-y-4"
        >
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full relative"
            >
              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Loading Text */}
          <div className="flex items-center justify-between px-1">
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm text-white/60"
            >
              {progress < 30 && "Initializing security..."}
              {progress >= 30 && progress < 60 && "Loading servers..."}
              {progress >= 60 && progress < 90 && "Preparing connection..."}
              {progress >= 90 && "Almost ready..."}
            </motion.p>
            <span className="text-sm text-[#22C55E] font-medium">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
