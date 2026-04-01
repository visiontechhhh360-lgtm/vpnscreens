import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Check, Smartphone, Lock, Apple } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { toast } from "sonner";

export function ApplePayForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || "monthly";
  const [email, setEmail] = useState("");
  const [appleId, setAppleId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    if (!email || !appleId) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    navigate("/main/payment-success", { state: { plan, method: "apple-pay" } });
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/main/payment-method")}
            className="p-2 bg-card/80 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </motion.button>
          <div>
            <h1 className="text-2xl text-foreground">Apple Pay</h1>
            <p className="text-sm text-muted-foreground">Complete your payment</p>
          </div>
        </div>

        {/* Apple Pay Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-black dark:bg-white rounded-3xl shadow-xl flex items-center justify-center">
            <Apple className="w-12 h-12 text-white dark:text-black" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 space-y-6"
        >
          {/* Plan Summary */}
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border-2 border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Selected Plan</p>
              <Check className="w-4 h-4 text-[#22C55E]" />
            </div>
            <p className="text-foreground font-medium capitalize">{plan} Subscription</p>
            <p className="text-2xl text-foreground font-bold mt-2">
              {plan === "monthly" ? "$9.99" : "$5.99"}/mo
            </p>
          </div>

          {/* Apple ID */}
          <div className="space-y-2">
            <label className="text-sm text-foreground font-medium flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Apple ID
            </label>
            <input
              type="email"
              value={appleId}
              onChange={(e) => setAppleId(e.target.value)}
              placeholder="your.appleid@icloud.com"
              className="w-full h-14 px-4 bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <label className="text-sm text-foreground font-medium">
              Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full h-14 px-4 bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
            />
          </div>

          {/* Touch ID/Face ID Notice */}
          <div className="flex items-start gap-3 bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded-xl p-4">
            <Smartphone className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Biometric Authentication</p>
              <p className="text-xs text-muted-foreground mt-1">
                You'll be asked to authenticate with Touch ID or Face ID to complete the payment.
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-xl p-4">
            <Lock className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Secure Payment</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your payment information is encrypted and processed securely through Apple Pay.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pay Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handlePay}
          disabled={isProcessing}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium shadow-lg disabled:opacity-50 mt-6"
        >
          {isProcessing ? "Processing..." : (
            <div className="flex items-center justify-center gap-2">
              <Apple className="w-5 h-5" />
              <span>Pay with Apple Pay</span>
            </div>
          )}
        </motion.button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
