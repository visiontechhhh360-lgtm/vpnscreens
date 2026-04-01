import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check, Crown, Zap } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function SubscriptionScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const handleStartTrial = () => {
    navigate("/main/plan-selection");
  };

  const handleSubscribe = () => {
    navigate("/main/plan-selection");
  };

  const showTrial = user?.subscriptionStatus === "free";

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant="green" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/main/settings")} className="p-2 bg-card/80 backdrop-blur-sm rounded-full shadow-sm">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-2xl text-foreground">Subscription</h1>
      </div>

      {/* Trial Banner */}
      {showTrial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl p-6 mb-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-medium">7-Day Free Trial</h3>
              <p className="text-white/80 text-sm">Experience Premium features</p>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {[
              "Unlimited bandwidth",
              "All server locations",
              "No speed limits",
              "Ad-free experience",
              "Priority support",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <p className="text-white text-sm">{benefit}</p>
              </div>
            ))}
          </ul>

          <button
            onClick={handleStartTrial}
            className="w-full bg-white text-[#3B82F6] rounded-xl p-4 font-medium"
          >
            Start Free Trial
          </button>
        </motion.div>
      )}

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3 flex-1 pb-4"
      >
        <h2 className="text-lg text-foreground font-medium mb-4">Premium Plans</h2>

        {/* Monthly Plan */}
        <button
          onClick={() => setSelectedPlan("monthly")}
          className={`w-full rounded-xl p-4 border-2 transition-all ${
            selectedPlan === "monthly"
              ? "border-[#22C55E] bg-[#22C55E]/5"
              : "border-border bg-card/90 backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-left">
              <p className="text-foreground font-medium">Monthly Plan</p>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-foreground font-bold">$9.99</p>
              <p className="text-sm text-muted-foreground">/month</p>
            </div>
          </div>
          {selectedPlan === "monthly" && (
            <div className="flex items-center gap-2 mt-2">
              <Check className="w-4 h-4 text-[#22C55E]" />
              <p className="text-sm text-[#22C55E]">Selected</p>
            </div>
          )}
        </button>

        {/* Yearly Plan */}
        <button
          onClick={() => setSelectedPlan("yearly")}
          className={`w-full rounded-xl p-4 border-2 transition-all relative overflow-hidden ${
            selectedPlan === "yearly"
              ? "border-[#22C55E] bg-[#22C55E]/5"
              : "border-border bg-card/90 backdrop-blur-sm"
          }`}
        >
          <div className="absolute top-2 right-2 bg-[#F59E0B] text-white text-xs px-3 py-1 rounded-full">
            Save 40%
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-left">
              <p className="text-foreground font-medium">Yearly Plan</p>
              <p className="text-sm text-muted-foreground">Billed annually</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-foreground font-bold">$5.99</p>
              <p className="text-sm text-muted-foreground">/month</p>
            </div>
          </div>
          {selectedPlan === "yearly" && (
            <div className="flex items-center gap-2 mt-2">
              <Check className="w-4 h-4 text-[#22C55E]" />
              <p className="text-sm text-[#22C55E]">Selected</p>
            </div>
          )}
        </button>

        {/* Features */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-[#F59E0B]" />
            <p className="text-foreground font-medium">Premium Features</p>
          </div>
          <ul className="space-y-2">
            {[
              "Access to all servers worldwide",
              "Unlimited bandwidth & speed",
              "Connect up to 10 devices",
              "24/7 customer support",
              "No ads or restrictions",
              "Advanced security protocols",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#22C55E]" />
                <p className="text-sm text-muted-foreground">{feature}</p>
              </div>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Subscribe Button */}
      {!showTrial && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleSubscribe}
          className="w-full bg-[#22C55E] text-white rounded-xl p-4 font-medium shadow-lg shadow-[#22C55E]/30 mt-4"
          whileTap={{ scale: 0.98 }}
        >
          Subscribe Now
        </motion.button>
      )}
      </div>
    </div>
  );
}