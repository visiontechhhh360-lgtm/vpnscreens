import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";

type Step = "email" | "otp" | "password" | "success";

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("otp");
    toast.success("Reset code sent to your email");
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("password");
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("success");
    setTimeout(() => {
      navigate("/auth/login");
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col px-6 py-12">
      {step !== "success" && (
        <button
          onClick={() => (step === "email" ? navigate("/auth/login") : setStep("email"))}
          className="self-start mb-8"
        >
          <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
        </button>
      )}

      {step === "email" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col"
          data-step="email"
        >
          <div className="flex-1">
            <h1 className="text-3xl text-[#0F172A] mb-2">Forgot Password?</h1>
            <p className="text-[#64748B] mb-8">Enter your email to reset your password</p>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
              />
            </div>
          </div>

          <motion.button
            onClick={handleSendCode}
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </motion.button>
        </motion.div>
      )}

      {step === "otp" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col"
          data-step="otp"
        >
          <div className="flex-1">
            <h1 className="text-3xl text-[#0F172A] mb-2">Verification</h1>
            <p className="text-[#64748B] mb-8">Enter the 6-digit code sent to {email}</p>

            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <motion.button
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 6}
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </motion.button>
        </motion.div>
      )}

      {step === "password" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col"
          data-step="password"
        >
          <div className="flex-1">
            <h1 className="text-3xl text-[#0F172A] mb-2">Reset Password</h1>
            <p className="text-[#64748B] mb-8">Create a new password</p>

            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                />
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleResetPassword}
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </motion.div>
      )}

      {step === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
          data-step="success"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-[#22C55E] rounded-full flex items-center justify-center mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl text-[#0F172A] mb-2">Password Reset!</h1>
          <p className="text-[#64748B]">You can now login with your new password</p>
        </motion.div>
      )}
    </div>
  );
}