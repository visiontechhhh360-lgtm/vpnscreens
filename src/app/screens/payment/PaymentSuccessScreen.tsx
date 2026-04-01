import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { Check, Sparkles, Crown } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import confetti from "canvas-confetti";
import { useAuth } from "../../contexts/AuthContext";

export function PaymentSuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateSubscription } = useAuth();
  const { plan, total } = location.state || { plan: "monthly", total: 0 };
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent running multiple times
    if (hasRun.current) return;
    hasRun.current = true;

    // Update subscription status
    const expiryDate = new Date();
    if (plan === "trial") {
      expiryDate.setDate(expiryDate.getDate() + 7);
      updateSubscription("trial", expiryDate.toLocaleDateString());
    } else if (plan === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      updateSubscription("premium", expiryDate.toLocaleDateString());
    } else if (plan === "yearly") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      updateSubscription("premium", expiryDate.toLocaleDateString());
    }

    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#22C55E", "#3B82F6", "#F59E0B"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#22C55E", "#3B82F6", "#F59E0B"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []); // Empty dependency array since we use ref to prevent re-runs

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="green" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 text-center">
        {/* Success Icon with Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="relative mb-8"
        >
          {/* Outer glow rings */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 bg-[#22C55E] rounded-full blur-2xl"
            style={{ width: "120px", height: "120px", left: "-10px", top: "-10px" }}
          />

          {/* Main circle */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.4,
              }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </div>

          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: Math.cos((i * Math.PI) / 3) * 60,
                y: Math.sin((i * Math.PI) / 3) * 60,
              }}
              transition={{
                duration: 1.5,
                delay: 0.6 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
            </motion.div>
          ))}
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl text-[#0F172A] font-bold mb-3">
            {plan === "trial" ? "Trial Activated!" : "Payment Successful!"}
          </h1>
          <p className="text-[#64748B] text-lg mb-2">
            {plan === "trial"
              ? "Enjoy 7 days of premium features"
              : "Your subscription is now active"}
          </p>
          {total > 0 && (
            <p className="text-[#64748B]">
              Payment of <span className="text-[#0F172A] font-medium">${total.toFixed(2)}</span> confirmed
            </p>
          )}
        </motion.div>

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-white/50 mb-8 w-full max-w-sm"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[#0F172A] text-xl font-bold">Premium Member</p>
              <p className="text-sm text-[#64748B] capitalize">{plan} Plan</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              "Unlimited bandwidth",
              "All server locations",
              "10 device connections",
              "Priority support",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-[#22C55E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#22C55E]" />
                </div>
                <p className="text-sm text-[#64748B]">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center">
            <p className="text-2xl font-bold text-[#0F172A] mb-1">
              {plan === "trial" ? "7" : plan === "monthly" ? "30" : "365"}
            </p>
            <p className="text-xs text-[#64748B]">Days of Protection</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center">
            <p className="text-2xl font-bold text-[#0F172A] mb-1">100+</p>
            <p className="text-xs text-[#64748B]">Server Locations</p>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          onClick={() => navigate("/main/home")}
          className="w-full max-w-sm bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl p-4 font-medium shadow-xl shadow-green-500/30"
          whileTap={{ scale: 0.98 }}
        >
          Start Using VPN
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-sm text-[#64748B] mt-6"
        >
          A confirmation email has been sent to your inbox
        </motion.p>
      </div>
    </div>
  );
}