import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function ApplePayProcessing() {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          {/* Apple Pay Logo with Animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto"
          >
            <div className="w-32 h-32 bg-black rounded-3xl shadow-2xl flex items-center justify-center">
              <svg width="80" height="32" viewBox="0 0 80 32" fill="white">
                <path d="M14.5 8.5C15.3 7.5 15.9 6.1 15.7 4.7C14.5 4.8 13 5.6 12.2 6.6C11.5 7.5 10.8 8.9 11 10.3C12.3 10.4 13.7 9.5 14.5 8.5Z"/>
                <path d="M15.7 10.5C13.5 10.4 11.7 11.9 10.6 11.9C9.5 11.9 8 10.5 6.2 10.5C3.9 10.6 1.8 11.9 0.7 14C-1.5 18.1 0.2 24.2 2.3 27.6C3.4 29.3 4.7 31.1 6.4 31C8 31 8.7 30 10.7 30C12.7 30 13.3 31 15.1 31C16.9 31 18 29.5 19.1 27.8C20.4 25.8 20.9 23.9 21 23.8C20.9 23.8 17.5 22.4 17.5 18.5C17.5 15.2 20.2 13.6 20.3 13.5C18.7 11.2 16.2 10.5 15.7 10.5Z"/>
              </svg>
            </div>
            
            {/* Pulse Rings */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 border-4 border-black rounded-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute inset-0 border-4 border-[#0F172A] rounded-3xl"
            />
          </motion.div>

          {/* Processing Text */}
          <div className="space-y-3">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mx-auto w-8 h-8"
            >
              <Loader2 className="w-8 h-8 text-[#0F172A]" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-[#0F172A]">Processing Payment</h2>
            <p className="text-[#64748B]">Please wait while we confirm your payment with Apple Pay...</p>
          </div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-[#0F172A]/20 rounded-full px-6 py-3"
          >
            <div className="w-2 h-2 bg-[#34A853] rounded-full animate-pulse" />
            <span className="text-sm text-[#64748B]">Secure Payment Processing</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
