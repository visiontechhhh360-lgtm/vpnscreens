import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function GooglePayProcessing() {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          {/* Google Pay Logo with Animation */}
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
            <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                <path d="M38.5 16C38.5 21.2467 34.2467 25.5 29 25.5C23.7533 25.5 19.5 21.2467 19.5 16C19.5 10.7533 23.7533 6.5 29 6.5C34.2467 6.5 38.5 10.7533 38.5 16Z" fill="#4285F4"/>
                <path d="M60.5 16C60.5 21.2467 56.2467 25.5 51 25.5C45.7533 25.5 41.5 21.2467 41.5 16C41.5 10.7533 45.7533 6.5 51 6.5C56.2467 6.5 60.5 10.7533 60.5 16Z" fill="#34A853"/>
                <path d="M49.5 16C49.5 21.2467 45.2467 25.5 40 25.5C34.7533 25.5 30.5 21.2467 30.5 16C30.5 10.7533 34.7533 6.5 40 6.5C45.2467 6.5 49.5 10.7533 49.5 16Z" fill="#FBBC04"/>
                <path d="M40 16C40 21.2467 35.7467 25.5 30.5 25.5C25.2533 25.5 21 21.2467 21 16C21 10.7533 25.2533 6.5 30.5 6.5C35.7467 6.5 40 10.7533 40 16Z" fill="#EA4335"/>
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
              className="absolute inset-0 border-4 border-[#4285F4] rounded-3xl"
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
              className="absolute inset-0 border-4 border-[#34A853] rounded-3xl"
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
              <Loader2 className="w-8 h-8 text-[#4285F4]" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-[#0F172A]">Processing Payment</h2>
            <p className="text-[#64748B]">Please wait while we confirm your payment with Google Pay...</p>
          </div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-[#4285F4]/20 rounded-full px-6 py-3"
          >
            <div className="w-2 h-2 bg-[#34A853] rounded-full animate-pulse" />
            <span className="text-sm text-[#64748B]">Secure Payment Processing</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
