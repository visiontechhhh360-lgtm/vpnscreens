import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Check, Shield, Lock, CreditCard, Loader2 } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function CheckoutScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, method, cardNumber } = location.state || { plan: "monthly", method: "card", cardNumber: "" };
  const [isProcessing, setIsProcessing] = useState(false);

  const getPlanDetails = () => {
    if (plan === "monthly") {
      return { name: "Monthly Plan", price: 9.99, billing: "Billed monthly" };
    } else if (plan === "yearly") {
      return { name: "Yearly Plan", price: 71.88, billing: "Billed annually", save: 48.00 };
    }
    return { name: "Trial", price: 0, billing: "7-day free trial" };
  };

  const planDetails = getPlanDetails();
  const tax = planDetails.price * 0.1; // 10% tax
  const total = planDetails.price + tax;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate("/payment-success", { state: { plan, total } });
    }, 2500);
  };

  const maskedCardNumber = cardNumber
    ? `•••• •••• •••• ${cardNumber.slice(-4)}`
    : "•••• •••• •••• ••••";

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="green" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
          </motion.button>
          <div>
            <h1 className="text-2xl text-[#0F172A]">Review & Confirm</h1>
            <p className="text-sm text-[#64748B]">Check your order details</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Plan Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg text-[#0F172A] font-medium">PureVPN VT Premium</h3>
                <p className="text-sm text-[#64748B]">{planDetails.name}</p>
                <p className="text-xs text-[#64748B] mt-1">{planDetails.billing}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-[#0F172A] font-bold">${planDetails.price.toFixed(2)}</p>
                {planDetails.save && (
                  <p className="text-xs text-[#22C55E] font-medium">Save ${planDetails.save.toFixed(2)}</p>
                )}
              </div>
            </div>

            {/* Features included */}
            <div className="border-t border-[#E2E8F0] pt-4 space-y-2">
              {[
                "Unlimited bandwidth & speed",
                "All global server locations",
                "Connect up to 10 devices",
                "24/7 priority support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#22C55E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#22C55E]" />
                  </div>
                  <p className="text-sm text-[#64748B]">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-white/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#64748B]" />
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Payment Method</p>
                  <p className="text-[#0F172A] font-medium font-mono">{maskedCardNumber}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-[#3B82F6] font-medium"
                disabled={isProcessing}
              >
                Change
              </button>
            </div>
          </motion.div>

          {/* Price Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-white/50 space-y-3"
          >
            <h3 className="text-[#0F172A] font-medium mb-3">Price Breakdown</h3>
            
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#64748B]">Subscription</p>
                <p className="text-sm text-[#0F172A] font-medium">${planDetails.price.toFixed(2)}</p>
              </div>

              {planDetails.save && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#22C55E]">Discount (40% off)</p>
                  <p className="text-sm text-[#22C55E] font-medium">-${planDetails.save.toFixed(2)}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-sm text-[#64748B]">Tax (10%)</p>
                <p className="text-sm text-[#0F172A] font-medium">${tax.toFixed(2)}</p>
              </div>

              <div className="border-t border-[#E2E8F0] pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-base text-[#0F172A] font-medium">Total</p>
                  <p className="text-2xl text-[#0F172A] font-bold">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-white/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#22C55E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-xs text-[#64748B]">256-bit</p>
                <p className="text-sm text-[#0F172A] font-medium">Encrypted</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-white/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-xs text-[#64748B]">PCI DSS</p>
                <p className="text-sm text-[#0F172A] font-medium">Compliant</p>
              </div>
            </div>
          </motion.div>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center px-4 py-2"
          >
            <p className="text-xs text-[#64748B]">
              By confirming, you agree to our{" "}
              <button className="text-[#3B82F6] underline">Terms of Service</button> and{" "}
              <button className="text-[#3B82F6] underline">Privacy Policy</button>
            </p>
          </motion.div>
        </div>

        {/* Confirm Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className={`w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl p-4 font-medium shadow-xl shadow-green-500/30 mt-4 flex items-center justify-center gap-2 ${
            isProcessing ? "opacity-80" : ""
          }`}
          whileTap={!isProcessing ? { scale: 0.98 } : {}}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Confirm Payment ${total.toFixed(2)}</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
