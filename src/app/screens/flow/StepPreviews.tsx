import { motion } from "motion/react";
import { Mail, Lock, Shield, ArrowLeft, Check, KeyRound } from "lucide-react";
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
