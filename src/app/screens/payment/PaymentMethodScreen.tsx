import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

type PaymentMethod = "card" | "google-pay" | "apple-pay";

export function PaymentMethodScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || { plan: "monthly" };
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  const handleContinue = () => {
    navigate("/main/payment-details", { state: { plan, method: selectedMethod } });
  };

  const methods = [
    {
      id: "card" as PaymentMethod,
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
      color: "from-[#6366F1] to-[#4F46E5]",
    },
    {
      id: "google-pay" as PaymentMethod,
      name: "Google Pay",
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      ),
      description: "Fast & secure",
      color: "from-[#34A853] to-[#0F9D58]",
    },
    {
      id: "apple-pay" as PaymentMethod,
      name: "Apple Pay",
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      ),
      description: "Secure one-tap",
      color: "from-[#000000] to-[#1F1F1F]",
    },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="blue" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
          </motion.button>
          <div>
            <h1 className="text-2xl text-[#0F172A]">Payment Method</h1>
            <p className="text-sm text-[#64748B]">Choose how you'd like to pay</p>
          </div>
        </div>

        {/* Plan Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-lg border-2 border-white/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Selected Plan</p>
              <p className="text-lg text-[#0F172A] font-medium capitalize">{plan} Plan</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-[#0F172A] font-bold">
                {plan === "monthly" ? "$9.99" : "$71.88"}
              </p>
              <p className="text-sm text-[#64748B]">
                {plan === "monthly" ? "/month" : "/year"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {methods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? "shadow-xl scale-[1.02]"
                  : "bg-white/90 backdrop-blur-sm shadow-lg border-2 border-white/50 hover:scale-[1.01]"
              }`}
            >
              {selectedMethod === method.id ? (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-10`} />
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-5 blur-xl`} />
                </>
              ) : null}

              <div className="relative p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      selectedMethod === method.id
                        ? `bg-gradient-to-r ${method.color} text-white shadow-lg`
                        : "bg-[#F8FAFC] text-[#64748B]"
                    }`}>
                      {typeof method.icon === "function" ? (
                        <method.icon />
                      ) : (
                        <method.icon className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <p className={`text-lg font-medium ${
                        selectedMethod === method.id ? "text-[#0F172A]" : "text-[#0F172A]"
                      }`}>
                        {method.name}
                      </p>
                      <p className={`text-sm ${
                        selectedMethod === method.id ? "text-[#64748B]" : "text-[#94A3B8]"
                      }`}>
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {selectedMethod === method.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${method.color}`}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Decorative glow effect */}
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r ${method.color} opacity-20 blur-3xl rounded-full`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl p-4 font-medium shadow-xl shadow-blue-500/30 mt-4"
          whileTap={{ scale: 0.98 }}
        >
          Continue to Payment
        </motion.button>
      </div>
    </div>
  );
}