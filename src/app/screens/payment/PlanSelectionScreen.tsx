import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check, Crown, Zap, Sparkles } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

type Plan = "trial" | "monthly" | "yearly";

export function PlanSelectionScreen() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");

  const handleContinue = () => {
    if (selectedPlan === "trial") {
      // Trial doesn't need payment
      navigate("/payment-success", { state: { plan: "trial" } });
    } else {
      navigate("/payment-method", { state: { plan: selectedPlan } });
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="green" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/subscription")}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
          </motion.button>
          <h1 className="text-2xl text-[#0F172A]">Choose Your Plan</h1>
        </div>

        {/* Free Trial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setSelectedPlan("trial")}
          className={`relative overflow-hidden rounded-2xl p-6 mb-4 cursor-pointer transition-all ${
            selectedPlan === "trial"
              ? "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-xl shadow-blue-500/30 scale-[1.02]"
              : "bg-white/90 backdrop-blur-sm shadow-lg border-2 border-white/50"
          }`}
        >
          {selectedPlan === "trial" && (
            <div className="absolute top-3 right-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
              >
                <Check className="w-5 h-5 text-[#3B82F6]" />
              </motion.div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedPlan === "trial" ? "bg-white/20" : "bg-[#3B82F6]/10"
            }`}>
              <Zap className={`w-6 h-6 ${selectedPlan === "trial" ? "text-white" : "text-[#3B82F6]"}`} />
            </div>
            <div>
              <h3 className={`text-xl font-medium ${selectedPlan === "trial" ? "text-white" : "text-[#0F172A]"}`}>
                7-Day Free Trial
              </h3>
              <p className={`text-sm ${selectedPlan === "trial" ? "text-white/80" : "text-[#64748B]"}`}>
                No credit card required
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {["Full access to all features", "All server locations", "Unlimited bandwidth"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Check className={`w-4 h-4 ${selectedPlan === "trial" ? "text-white" : "text-[#3B82F6]"}`} />
                <p className={`text-sm ${selectedPlan === "trial" ? "text-white" : "text-[#64748B]"}`}>{benefit}</p>
              </div>
            ))}
          </ul>
        </motion.div>

        {/* Plans Container */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          <h2 className="text-lg text-[#0F172A] font-medium">Premium Plans</h2>

          {/* Monthly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelectedPlan("monthly")}
            className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all ${
              selectedPlan === "monthly"
                ? "bg-white shadow-xl shadow-green-500/20 border-2 border-[#22C55E] scale-[1.02]"
                : "bg-white/90 backdrop-blur-sm shadow-lg border-2 border-white/50"
            }`}
          >
            {selectedPlan === "monthly" && (
              <div className="absolute top-3 right-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[#0F172A] font-medium text-lg">Monthly Plan</p>
                <p className="text-sm text-[#64748B]">Billed monthly</p>
              </div>
              <div className="text-right">
                <p className="text-3xl text-[#0F172A] font-bold">$9.99</p>
                <p className="text-sm text-[#64748B]">/month</p>
              </div>
            </div>
          </motion.div>

          {/* Yearly Plan - Best Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setSelectedPlan("yearly")}
            className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all ${
              selectedPlan === "yearly"
                ? "bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-xl shadow-green-500/30 scale-[1.02]"
                : "bg-white/90 backdrop-blur-sm shadow-lg border-2 border-[#22C55E]/30"
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-1 -right-1">
              <div className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-xs font-medium px-4 py-1.5 rounded-bl-xl rounded-tr-xl flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" />
                BEST VALUE
              </div>
            </div>

            {selectedPlan === "yearly" && (
              <div className="absolute top-3 left-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-[#22C55E]" />
                </motion.div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-3 mt-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedPlan === "yearly" ? "bg-white/20" : "bg-[#22C55E]/10"
              }`}>
                <Crown className={`w-5 h-5 ${selectedPlan === "yearly" ? "text-white" : "text-[#22C55E]"}`} />
              </div>
              <div className="flex-1">
                <p className={`text-lg font-medium ${selectedPlan === "yearly" ? "text-white" : "text-[#0F172A]"}`}>
                  Yearly Plan
                </p>
                <p className={`text-sm ${selectedPlan === "yearly" ? "text-white/80" : "text-[#64748B]"}`}>
                  Billed annually
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between mb-3">
              <div>
                <p className={`text-sm ${selectedPlan === "yearly" ? "text-white/70" : "text-[#64748B]"} line-through`}>
                  $119.88
                </p>
                <p className={`text-3xl font-bold ${selectedPlan === "yearly" ? "text-white" : "text-[#0F172A]"}`}>
                  $71.88
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full ${
                selectedPlan === "yearly" ? "bg-white/20" : "bg-[#22C55E]/10"
              }`}>
                <p className={`text-sm font-medium ${selectedPlan === "yearly" ? "text-white" : "text-[#22C55E]"}`}>
                  Save 40%
                </p>
              </div>
            </div>

            <p className={`text-sm ${selectedPlan === "yearly" ? "text-white/90" : "text-[#64748B]"}`}>
              Just $5.99/month
            </p>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/50 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-[#F59E0B]" />
              <p className="text-[#0F172A] font-medium">All Premium Features</p>
            </div>
            <ul className="space-y-2.5">
              {[
                "Unlimited bandwidth & speed",
                "Access all global servers",
                "Connect 10 devices",
                "24/7 priority support",
                "Advanced security protocols",
                "No ads or restrictions",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#22C55E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#22C55E]" />
                  </div>
                  <p className="text-sm text-[#64748B]">{feature}</p>
                </div>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl p-4 font-medium shadow-xl shadow-green-500/30 mt-4"
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}
