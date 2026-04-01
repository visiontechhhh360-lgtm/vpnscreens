import { motion } from "motion/react";
import { Mail, Lock, Shield, ArrowLeft, Check, KeyRound, Zap, Globe } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";

// Static preview components for multi-step flows

export function CreateAccountEmailPreview() {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-white">
      <button className="self-start mb-8">
        <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl text-[#0F172A] mb-2">Create Account</h1>
          <p className="text-[#64748B] mb-8">Enter your email to get started</p>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="email"
              placeholder="Email address"
              value=""
              readOnly
              className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B]"
            />
          </div>
        </div>

        <button className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30">
          Send Code
        </button>
      </div>
    </div>
  );
}

export function CreateAccountOTPPreview() {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-white">
      <button className="self-start mb-8">
        <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl text-[#0F172A] mb-2">Verification</h1>
          <p className="text-[#64748B] mb-8">Enter the 6-digit code sent to your email</p>

          <div className="flex justify-center pointer-events-none">
            <InputOTP maxLength={6} value="" onChange={() => {}}>
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

          <button className="text-[#22C55E] text-sm text-center w-full mt-4">
            Resend code
          </button>
        </div>

        <button className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 opacity-50">
          Verify
        </button>
      </div>
    </div>
  );
}

export function CreateAccountPasswordPreview() {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-white">
      <button className="self-start mb-8">
        <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl text-[#0F172A] mb-2">Set Password</h1>
          <p className="text-[#64748B] mb-8">Create a secure password</p>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="password"
                placeholder="Password"
                value=""
                readOnly
                className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="password"
                placeholder="Confirm Password"
                value=""
                readOnly
                className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B]"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E2E8F0] rounded-full" />
              <p className="text-xs text-[#64748B]">At least 8 characters</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E2E8F0] rounded-full" />
              <p className="text-xs text-[#64748B]">Contains a number</p>
            </div>
          </div>
        </div>

        <button className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30">
          Create Account
        </button>
      </div>
    </div>
  );
}

export function ForgotPasswordEmailPreview() {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-white">
      <button className="self-start mb-8">
        <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl text-[#0F172A] mb-2">Forgot Password?</h1>
          <p className="text-[#64748B] mb-8">Enter your email to reset your password</p>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="email"
              placeholder="Email address"
              value=""
              readOnly
              className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B]"
            />
          </div>
        </div>

        <button className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30">
          Send Reset Code
        </button>
      </div>
    </div>
  );
}

export function ForgotPasswordOTPPreview() {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-white">
      <button className="self-start mb-8">
        <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl text-[#0F172A] mb-2">Verification</h1>
          <p className="text-[#64748B] mb-8">Enter the 6-digit code sent to your email</p>

          <div className="flex justify-center pointer-events-none">
            <InputOTP maxLength={6} value="" onChange={() => {}}>
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

        <button className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 opacity-50">
          Verify
        </button>
      </div>
    </div>
  );
}

export function ForgotPasswordNewPasswordPreview() {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-white">
      <button className="self-start mb-8">
        <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl text-[#0F172A] mb-2">Reset Password</h1>
          <p className="text-[#64748B] mb-8">Create a new password</p>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="password"
                placeholder="New Password"
                value=""
                readOnly
                className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="password"
                placeholder="Confirm Password"
                value=""
                readOnly
                className="w-full h-14 pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B]"
              />
            </div>
          </div>
        </div>

        <button className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30">
          Reset Password
        </button>
      </div>
    </div>
  );
}

// Static Splash Screen Preview (no navigation logic)
export function SplashScreenPreview() {
  const features = [
    { icon: Shield, label: "Secure" },
    { icon: Zap, label: "Fast" },
    { icon: Lock, label: "Private" },
    { icon: Globe, label: "Global" },
  ];

  return (
    <div className="h-full w-full relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 w-80 h-80 bg-[#22C55E] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-16">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          {/* Logo with Pulse Animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-8"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#22C55E] rounded-full blur-2xl"
            />
            
            {/* Main Logo */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-[2.5rem] flex items-center justify-center shadow-2xl">
              <Shield className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-2">
              WeeTee<span className="text-[#22C55E]">360</span>
            </h1>
            <p className="text-xl text-white/60 font-light tracking-wider">VPN</p>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-8 mt-12"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <span className="text-xs text-white/60">{feature.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Loading Progress - Static at 75% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full space-y-4"
        >
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full relative"
            >
              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Loading Text */}
          <div className="flex items-center justify-between px-1">
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm text-white/60"
            >
              Preparing connection...
            </motion.p>
            <span className="text-sm text-[#22C55E] font-medium">75%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}