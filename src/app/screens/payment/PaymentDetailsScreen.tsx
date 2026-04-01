import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, CreditCard, Lock, AlertCircle } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export function PaymentDetailsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, method } = location.state || { plan: "monthly", method: "card" };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: "" });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: "" });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCvv(value);
    if (errors.cvv) {
      setErrors({ ...errors, cvv: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = "Please enter expiry date (MM/YY)";
    }

    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = "Please enter CVV";
    }

    if (!cardName.trim()) {
      newErrors.cardName = "Please enter cardholder name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate("/main/payment-checkout", { state: { plan, method, cardNumber } });
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
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
            <h1 className="text-2xl text-[#0F172A]">Payment Details</h1>
            <p className="text-sm text-[#64748B]">Enter your card information</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Card Preview */}
          <motion.div
            initial={{ opacity: 0, rotateY: -10 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#475569] rounded-2xl p-6 shadow-2xl overflow-hidden"
            style={{ perspective: "1000px" }}
          >
            {/* Card glow effect */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#3B82F6]/30 to-[#22C55E]/30 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#22C55E]/20 to-transparent blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-lg opacity-80" />
                <CreditCard className="w-10 h-10 text-white/50" />
              </div>

              <div className="mb-6">
                <p className="text-white/50 text-xs mb-2">Card Number</p>
                <p className="text-white text-xl font-mono tracking-wider">
                  {cardNumber || "•••• •••• •••• ••••"}
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/50 text-xs mb-1">Cardholder</p>
                  <p className="text-white text-sm font-medium uppercase">
                    {cardName || "YOUR NAME"}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Expires</p>
                  <p className="text-white text-sm font-mono">
                    {expiryDate || "MM/YY"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/50 space-y-5"
          >
            {/* Card Number */}
            <div>
              <Label htmlFor="cardNumber" className="text-[#0F172A] mb-2 block">
                Card Number
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className={`pl-12 bg-[#F8FAFC] border-2 ${
                    errors.cardNumber ? "border-red-500" : "border-[#E2E8F0]"
                  } h-12 font-mono text-lg`}
                />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              </div>
              {errors.cardNumber && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <p className="text-xs text-red-500">{errors.cardNumber}</p>
                </div>
              )}
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="text-[#0F172A] mb-2 block">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className={`bg-[#F8FAFC] border-2 ${
                    errors.expiryDate ? "border-red-500" : "border-[#E2E8F0]"
                  } h-12 font-mono text-lg`}
                />
                {errors.expiryDate && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <p className="text-xs text-red-500">{errors.expiryDate}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="cvv" className="text-[#0F172A] mb-2 block">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className={`bg-[#F8FAFC] border-2 ${
                    errors.cvv ? "border-red-500" : "border-[#E2E8F0]"
                  } h-12 font-mono text-lg`}
                />
                {errors.cvv && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <p className="text-xs text-red-500">{errors.cvv}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <Label htmlFor="cardName" className="text-[#0F172A] mb-2 block">
                Cardholder Name
              </Label>
              <Input
                id="cardName"
                type="text"
                value={cardName}
                onChange={(e) => {
                  setCardName(e.target.value);
                  if (errors.cardName) {
                    setErrors({ ...errors, cardName: "" });
                  }
                }}
                placeholder="John Doe"
                className={`bg-[#F8FAFC] border-2 ${
                  errors.cardName ? "border-red-500" : "border-[#E2E8F0]"
                } h-12 text-lg uppercase`}
              />
              {errors.cardName && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <p className="text-xs text-red-500">{errors.cardName}</p>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 bg-[#F0FDF4] border border-[#22C55E]/20 rounded-xl">
              <Lock className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#0F172A] font-medium mb-1">Secure Payment</p>
                <p className="text-xs text-[#64748B]">
                  Your payment information is encrypted and secure. We never store your full card details.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl p-4 font-medium shadow-xl shadow-green-500/30 mt-4"
          whileTap={{ scale: 0.98 }}
        >
          Continue to Checkout
        </motion.button>
      </div>
    </div>
  );
}