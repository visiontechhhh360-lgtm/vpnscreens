import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function PaymentErrorScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-8"
        >
          <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
        </button>

        {/* Error Content */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {/* Error Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#EF4444] rounded-full blur-2xl"
            />
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center shadow-2xl">
              <XCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-3"
          >
            <h2 className="text-2xl font-bold text-[#0F172A]">Payment Failed</h2>
            <p className="text-[#64748B] max-w-xs mx-auto">
              We couldn't process your payment. Please check your payment details and try again.
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-[#EF4444]/20"
          >
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Error Code:</span>
                <span className="text-[#0F172A] font-mono">ERR_PAYMENT_001</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Reason:</span>
                <span className="text-[#0F172A]">Payment declined</span>
              </div>
            </div>
          </motion.div>

          {/* Possible Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-[#F59E0B]/20"
          >
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Common Solutions:</h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">•</span>
                <span>Check if you have sufficient funds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">•</span>
                <span>Verify your card details are correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">•</span>
                <span>Contact your bank if the issue persists</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <motion.button
            onClick={() => navigate("/payment-method")}
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact-support")}
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 bg-white/80 backdrop-blur-sm border-2 border-[#E2E8F0] text-[#0F172A] rounded-xl font-medium"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
