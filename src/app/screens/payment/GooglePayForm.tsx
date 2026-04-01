import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Check, Smartphone, Lock } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { toast } from "sonner";

export function GooglePayForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || "monthly";
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    if (!email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    navigate("/main/payment-success", { state: { plan, method: "google-pay" } });
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant="blue" />
      
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
            <h1 className="text-2xl text-foreground">Google Pay</h1>
            <p className="text-sm text-muted-foreground">Complete your payment</p>
          </div>
        </div>

        {/* Google Pay Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-white dark:bg-card rounded-3xl shadow-xl flex items-center justify-center">
            <svg width="60" height="24" viewBox="0 0 80 32" fill="none">
              <path d="M38.5 16C38.5 21.2467 34.2467 25.5 29 25.5C23.7533 25.5 19.5 21.2467 19.5 16C19.5 10.7533 23.7533 6.5 29 6.5C34.2467 6.5 38.5 10.7533 38.5 16Z" fill="#4285F4"/>
              <path d="M60.5 16C60.5 21.2467 56.2467 25.5 51 25.5C45.7533 25.5 41.5 21.2467 41.5 16C41.5 10.7533 45.7533 6.5 51 6.5C56.2467 6.5 60.5 10.7533 60.5 16Z" fill="#34A853"/>
              <path d="M49.5 16C49.5 21.2467 45.2467 25.5 40 25.5C34.7533 25.5 30.5 21.2467 30.5 16C30.5 10.7533 34.7533 6.5 40 6.5C45.2467 6.5 49.5 10.7533 49.5 16Z" fill="#FBBC04"/>
              <path d="M40 16C40 21.2467 35.7467 25.5 30.5 25.5C25.2533 25.5 21 21.2467 21 16C21 10.7533 25.2533 6.5 30.5 6.5C35.7467 6.5 40 10.7533 40 16Z" fill="#EA4335"/>
            </svg>
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

          {/* Google Account Email */}
          <div className="space-y-2">
            <label className="text-sm text-foreground font-medium">
              Google Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@gmail.com"
              className="w-full h-14 px-4 bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm text-foreground font-medium flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Phone Number (for verification)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full h-14 px-4 bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 transition-all"
            />
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 bg-[#4285F4]/5 border border-[#4285F4]/20 rounded-xl p-4">
            <Lock className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Secure Payment</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your payment information is encrypted and processed securely through Google Pay.
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
          className="w-full h-14 bg-gradient-to-r from-[#4285F4] to-[#3B82F6] text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 disabled:opacity-50 mt-6"
        >
          {isProcessing ? "Processing..." : `Pay with Google Pay`}
        </motion.button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
