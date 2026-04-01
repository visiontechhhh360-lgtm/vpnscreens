import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";

// Import all actual screen components
import { LoginScreen } from "../auth/LoginScreen";
import { HomeScreen } from "../home/HomeScreen";
import { ServersScreen } from "../servers/ServersScreen";
import { SettingsScreen } from "../settings/SettingsScreen";
import { AccountScreen } from "../account/AccountScreen";
import { SubscriptionScreen } from "../subscription/SubscriptionScreen";
import { SetupDevicesScreen } from "../setup/SetupDevicesScreen";
import { RateUsScreen } from "../rate/RateUsScreen";
import { SplitTunnelingScreen } from "../settings/SplitTunnelingScreen";
import { PlanSelectionScreen } from "../payment/PlanSelectionScreen";
import { PaymentMethodScreen } from "../payment/PaymentMethodScreen";
import { PaymentDetailsScreen } from "../payment/PaymentDetailsScreen";
import { CheckoutScreen } from "../payment/CheckoutScreen";
import { GooglePayProcessing } from "../payment/GooglePayProcessing";
import { ApplePayProcessing } from "../payment/ApplePayProcessing";
import { PaymentSuccessScreen } from "../payment/PaymentSuccessScreen";
import { PaymentErrorScreen } from "../payment/PaymentErrorScreen";
import { ContactSupportScreen } from "../support/ContactSupportScreen";
import { HelpCenterScreen } from "../support/HelpCenterScreen";

// Import static previews for multi-step flows
import {
  SplashScreenPreview,
  CreateAccountEmailPreview,
  CreateAccountOTPPreview,
  CreateAccountPasswordPreview,
  ForgotPasswordEmailPreview,
  ForgotPasswordOTPPreview,
  ForgotPasswordNewPasswordPreview,
} from "./StepPreviews";

interface Screen {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  color?: string;
}

export function UXMapScreen() {
  // All screens organized in flow order
  const flowScreens = {
    start: [
      { id: "splash", name: "Splash Screen", component: SplashScreenPreview, color: "#6366F1" },
    ],
    auth: [
      { id: "login", name: "Login", component: LoginScreen, color: "#3B82F6" },
      { id: "create-email", name: "Create Account\n(Email)", component: CreateAccountEmailPreview, color: "#3B82F6" },
      { id: "create-otp", name: "Verify OTP", component: CreateAccountOTPPreview, color: "#3B82F6" },
      { id: "create-password", name: "Set Password", component: CreateAccountPasswordPreview, color: "#3B82F6" },
      { id: "forgot-email", name: "Forgot Password\n(Email)", component: ForgotPasswordEmailPreview, color: "#3B82F6" },
      { id: "forgot-otp", name: "Reset OTP", component: ForgotPasswordOTPPreview, color: "#3B82F6" },
      { id: "forgot-password", name: "New Password", component: ForgotPasswordNewPasswordPreview, color: "#3B82F6" },
    ],
    core: [
      { id: "home", name: "Home", component: HomeScreen, color: "#22C55E" },
      { id: "servers", name: "Servers", component: ServersScreen, color: "#22C55E" },
      { id: "settings", name: "Settings", component: SettingsScreen, color: "#22C55E" },
    ],
    payment: [
      { id: "plan-selection", name: "Plans", component: PlanSelectionScreen, color: "#F59E0B" },
      { id: "payment-method", name: "Payment Method", component: PaymentMethodScreen, color: "#F59E0B" },
      { id: "payment-details", name: "Payment Details", component: PaymentDetailsScreen, color: "#F59E0B" },
      { id: "checkout", name: "Checkout", component: CheckoutScreen, color: "#F59E0B" },
      { id: "google-pay", name: "Google Pay\nProcessing", component: GooglePayProcessing, color: "#4285F4" },
      { id: "apple-pay", name: "Apple Pay\nProcessing", component: ApplePayProcessing, color: "#000000" },
      { id: "payment-success", name: "Success", component: PaymentSuccessScreen, color: "#10B981" },
      { id: "payment-error", name: "Error", component: PaymentErrorScreen, color: "#EF4444" },
    ],
    features: [
      { id: "account", name: "Account", component: AccountScreen, color: "#8B5CF6" },
      { id: "subscription", name: "Subscription", component: SubscriptionScreen, color: "#8B5CF6" },
      { id: "setup-devices", name: "Setup Devices", component: SetupDevicesScreen, color: "#8B5CF6" },
      { id: "rate-us", name: "Rate Us", component: RateUsScreen, color: "#8B5CF6" },
      { id: "split-tunneling", name: "Split Tunneling", component: SplitTunnelingScreen, color: "#8B5CF6" },
    ],
    support: [
      { id: "contact-support", name: "Contact Support", component: ContactSupportScreen, color: "#EC4899" },
      { id: "help-center", name: "Help Center", component: HelpCenterScreen, color: "#EC4899" },
    ],
  };

  const MiniScreen = ({ screen, showLabel = true }: { screen: Screen; showLabel?: boolean }) => {
    const Component = screen.component;
    
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className="relative bg-black rounded-[16px] shadow-2xl overflow-hidden border-[3px]"
          style={{ 
            width: "156px", 
            height: "338px",
            borderColor: screen.color || "#E2E8F0"
          }}
        >
          {/* Mobile Frame - Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-b-2xl z-30" />
          
          {/* Screen Content - Scaled Down 40% */}
          <div 
            className="absolute inset-0"
            style={{
              width: "390px",
              height: "844px",
              transform: "scale(0.4)",
              transformOrigin: "top left"
            }}
          >
            <Component />
          </div>
        </div>
        {showLabel && (
          <p className="text-[10px] font-semibold text-[#0F172A] whitespace-pre-line text-center leading-tight">
            {screen.name}
          </p>
        )}
      </div>
    );
  };

  const ConnectionLine = ({ vertical = false, dashed = false }: { vertical?: boolean; dashed?: boolean }) => (
    <div
      className={`${vertical ? "w-[2px] h-6" : "h-[2px] flex-1"} ${dashed ? "border-dashed border-2 border-[#94A3B8]" : "bg-[#94A3B8]"}`}
    />
  );

  const FlowNode = ({ label, icon: Icon }: { label: string; icon?: React.ComponentType<any> }) => (
    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-[#E2E8F0] shadow-sm">
      {Icon && <Icon className="w-3 h-3 text-[#64748B]" />}
      <span className="text-[10px] font-medium text-[#64748B]">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0FDF4] overflow-auto">
      <div className="min-w-[2400px] p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A]">WeeTee360 VPN - Premium Flow Board</h1>
          </div>
          <p className="text-sm text-[#64748B]">Complete user journey • 26 screens • Live previews</p>
        </motion.div>

        {/* Flow Board */}
        <div className="space-y-8">
          {/* Row 1: Splash */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <FlowNode label="App Launch" icon={Zap} />
            <ConnectionLine vertical />
            <MiniScreen screen={flowScreens.start[0]} />
            <ConnectionLine vertical />
            <ArrowRight className="w-4 h-4 text-[#64748B] rotate-90" />
          </motion.div>

          {/* Row 2: Authentication Flow */}
  <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#3B82F6]/20"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-[#3B82F6]">Authentication</h3>
            </div>
            
            <div className="flex items-center justify-center ">
              {/* Login */}
              <div className="flex flex-col items-center gap-4">
  <div className="text-center">
    <p className="text-[10px] font-semibold text-[#3B82F6] mb-2">Login</p>
  </div>
  <MiniScreen screen={flowScreens.auth[0]} />
</div>

              
                <div className="flex items-center gap-2">
                  <ConnectionLine />
                  <ArrowRight className="w-3 h-3 text-[#64748B]" />
                  <ConnectionLine />
                </div>

              {/* Create Account Flow */}
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-[#3B82F6] mb-2">Sign Up Flow</p>
                </div>
                <div className="flex items-center gap-2">
                  {flowScreens.auth.slice(1, 4).map((screen, idx) => (
                    <div key={screen.id} className="flex items-center gap-2">
                      <MiniScreen screen={screen} />
                      {idx < 2 && <ArrowRight className="w-3 h-3 text-[#94A3B8]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Forgot Password Flow */}
            <div className="flex justify-center mt-6 pt-6 border-t-2 border-[#E2E8F0]">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] font-semibold text-[#3B82F6]">Password Recovery</p>
                <div className="flex items-center gap-2">
                  {flowScreens.auth.slice(4, 7).map((screen, idx) => (
                    <div key={screen.id} className="flex items-center gap-2">
                      <MiniScreen screen={screen} />
                      {idx < 2 && <ArrowRight className="w-3 h-3 text-[#94A3B8]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <ConnectionLine vertical />
            <ArrowRight className="w-5 h-5 text-[#64748B] rotate-90 my-2" />
          </div>

          {/* Row 3: Core VPN Screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#22C55E]/20"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-[#22C55E]">VPN Core - Main Navigation</h3>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              {flowScreens.core.map((screen, idx) => (
                <div key={screen.id} className="flex items-center gap-4">
                  <MiniScreen screen={screen} />
                  {idx < flowScreens.core.length - 1 && (
                    <div className="flex flex-col items-center gap-1">
                      <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                      <ConnectionLine dashed />
                      <ArrowRight className="w-5 h-5 text-[#94A3B8] rotate-180" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center">
            <ConnectionLine vertical />
            <ArrowRight className="w-5 h-5 text-[#64748B] rotate-90 my-2" />
          </div>

          {/* Row 4: Payment Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#F59E0B]/20"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-[#F59E0B]">Subscription & Payment Flow</h3>
            </div>
            
            {/* Main Payment Flow */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {flowScreens.payment.slice(0, 4).map((screen, idx) => (
                <div key={screen.id} className="flex items-center gap-2">
                  <div className="relative">
                    <MiniScreen screen={screen} />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#F59E0B] text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  {idx < 3 && <ArrowRight className="w-4 h-4 text-[#94A3B8]" />}
                </div>
              ))}
            </div>

            {/* Payment Options Split */}
            <div className="flex items-start justify-center gap-8">
              {/* Google Pay Path */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] font-semibold text-[#4285F4]">Google Pay</p>
                <div className="flex items-center gap-2">
                  <MiniScreen screen={flowScreens.payment[4]} />
                  <ArrowRight className="w-3 h-3 text-[#94A3B8]" />
                  <MiniScreen screen={flowScreens.payment[6]} />
                </div>
              </div>

              {/* Apple Pay Path */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] font-semibold text-[#0F172A]">Apple Pay</p>
                <div className="flex items-center gap-2">
                  <MiniScreen screen={flowScreens.payment[5]} />
                  <ArrowRight className="w-3 h-3 text-[#94A3B8]" />
                  <MiniScreen screen={flowScreens.payment[6]} />
                </div>
              </div>

              {/* Error Path */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-[10px] font-semibold text-[#EF4444]">On Error</p>
                <MiniScreen screen={flowScreens.payment[7]} />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <ConnectionLine vertical />
            <ArrowRight className="w-5 h-5 text-[#64748B] rotate-90 my-2" />
          </div>

          {/* Row 5: Features & Support */}
          <div className="grid grid-cols-2 gap-6">
            {/* Account Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#8B5CF6]/20"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-[#8B5CF6]">Account Features</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {flowScreens.features.map((screen) => (
                  <MiniScreen key={screen.id} screen={screen} />
                ))}
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-[#EC4899]/20"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-[#EC4899]">Support & Help</h3>
              </div>
              <div className="flex items-center justify-center gap-6">
                {flowScreens.support.map((screen) => (
                  <MiniScreen key={screen.id} screen={screen} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-3xl p-6 border-2 border-[#E2E8F0] shadow-xl"
          >
            <div className="grid grid-cols-7 gap-3">
              {[
                { label: "Start", count: 1, color: "#6366F1" },
                { label: "Auth", count: 7, color: "#3B82F6" },
                { label: "Core", count: 3, color: "#22C55E" },
                { label: "Payment", count: 8, color: "#F59E0B" },
                { label: "Features", count: 5, color: "#8B5CF6" },
                { label: "Support", count: 2, color: "#EC4899" },
                { label: "Total", count: 26, color: "#0F172A" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-3 bg-white rounded-xl border-2 shadow-sm"
                  style={{ borderColor: `${item.color}30` }}
                >
                  <p className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.count}
                  </p>
                  <p className="text-[10px] text-[#64748B] mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}