import { motion } from "motion/react";
import { 
  ArrowRight, 
  LogIn, 
  Home, 
  Server, 
  Settings, 
  User, 
  CreditCard, 
  HelpCircle,
  UserPlus,
  KeyRound,
  CheckCircle,
  Smartphone,
  Star,
  MessageSquare,
  BookOpen,
  AppWindow
} from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";

interface FlowCard {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface Connection {
  from: string;
  to: string;
  label: string;
}

export function AppFlowScreen() {
  // Define all screens organized by section
  const authFlows: FlowCard[] = [
    { id: "login", name: "Login", icon: LogIn, color: "#3B82F6" },
    { id: "create-account", name: "Create Account", icon: UserPlus, color: "#3B82F6" },
    { id: "forgot-password", name: "Forgot Password", icon: KeyRound, color: "#3B82F6" },
  ];

  const mainFlows: FlowCard[] = [
    { id: "home", name: "Home", icon: Home, color: "#22C55E" },
    { id: "servers", name: "Servers", icon: Server, color: "#22C55E" },
    { id: "settings", name: "Settings", icon: Settings, color: "#22C55E" },
  ];

  const subscriptionFlows: FlowCard[] = [
    { id: "plan-selection", name: "Plan Selection", icon: CreditCard, color: "#F59E0B" },
    { id: "payment-method", name: "Payment Method", icon: CreditCard, color: "#F59E0B" },
    { id: "payment-details", name: "Payment Details", icon: CreditCard, color: "#F59E0B" },
    { id: "payment-checkout", name: "Checkout", icon: CreditCard, color: "#F59E0B" },
    { id: "payment-success", name: "Payment Success", icon: CheckCircle, color: "#22C55E" },
  ];

  const accountFlows: FlowCard[] = [
    { id: "account", name: "Account", icon: User, color: "#8B5CF6" },
    { id: "subscription", name: "Subscription", icon: CreditCard, color: "#8B5CF6" },
    { id: "setup-devices", name: "Setup Devices", icon: Smartphone, color: "#8B5CF6" },
    { id: "rate-us", name: "Rate Us", icon: Star, color: "#8B5CF6" },
    { id: "split-tunneling", name: "Split Tunneling", icon: AppWindow, color: "#8B5CF6" },
  ];

  const supportFlows: FlowCard[] = [
    { id: "contact-support", name: "Contact Support", icon: MessageSquare, color: "#EC4899" },
    { id: "help-center", name: "Help Center", icon: BookOpen, color: "#EC4899" },
  ];

  const connections: Connection[] = [
    // Auth to Main
    { from: "login", to: "home", label: "On Login Success" },
    { from: "create-account", to: "home", label: "On Account Created" },
    { from: "forgot-password", to: "login", label: "On Password Reset" },
    
    // Main App Navigation
    { from: "home", to: "servers", label: "Change Server" },
    { from: "home", to: "settings", label: "Open Settings" },
    { from: "servers", to: "home", label: "On Server Selected" },
    
    // Settings to Account
    { from: "settings", to: "account", label: "Manage Account" },
    { from: "settings", to: "subscription", label: "View Subscription" },
    { from: "settings", to: "setup-devices", label: "Setup Devices" },
    { from: "settings", to: "rate-us", label: "Rate App" },
    
    // Subscription Flow
    { from: "subscription", to: "plan-selection", label: "Upgrade Plan" },
    { from: "plan-selection", to: "payment-method", label: "On Select Plan" },
    { from: "payment-method", to: "payment-details", label: "On Choose Method" },
    { from: "payment-details", to: "payment-checkout", label: "Continue to Checkout" },
    { from: "payment-checkout", to: "payment-success", label: "On Payment Complete" },
    { from: "payment-success", to: "home", label: "Done" },
    
    // Support
    { from: "settings", to: "contact-support", label: "Get Support" },
    { from: "settings", to: "help-center", label: "View Help" },
  ];

  const FlowCardComponent = ({ card, index }: { card: FlowCard; index: number }) => {
    const Icon = card.icon;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="relative bg-white rounded-xl border-2 border-[#E2E8F0] p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${card.color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: card.color }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#0F172A]">{card.name}</p>
            <p className="text-xs text-[#64748B]">/{card.id}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  const SectionTitle = ({ title, color }: { title: string; color: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
      <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
    </div>
  );

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl text-[#0F172A] mb-1">App Flow</h1>
          <p className="text-sm text-[#64748B]">Complete user journey map</p>
        </motion.div>

        {/* Flow Visualization */}
        <div className="space-y-8 pb-8">
          {/* Authentication Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SectionTitle title="Authentication Flow" color="#3B82F6" />
            <div className="grid grid-cols-1 gap-3">
              {authFlows.map((card, index) => (
                <FlowCardComponent key={card.id} card={card} index={index} />
              ))}
            </div>
            <div className="flex items-center justify-center py-3">
              <div className="flex items-center gap-2 text-xs text-[#64748B] bg-white/80 px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                <ArrowRight className="w-4 h-4" />
                <span>On Login Success</span>
              </div>
            </div>
          </motion.div>

          {/* Main App Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle title="Main App" color="#22C55E" />
            <div className="grid grid-cols-1 gap-3">
              {mainFlows.map((card, index) => (
                <FlowCardComponent key={card.id} card={card} index={index} />
              ))}
            </div>
            <div className="flex flex-col items-center gap-2 py-3">
              <div className="flex items-center gap-2 text-xs text-[#64748B] bg-white/80 px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                <ArrowRight className="w-4 h-4" />
                <span>Navigate Between Screens</span>
              </div>
            </div>
          </motion.div>

          {/* Account Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle title="Account & Settings" color="#8B5CF6" />
            <div className="grid grid-cols-1 gap-3">
              {accountFlows.map((card, index) => (
                <FlowCardComponent key={card.id} card={card} index={index} />
              ))}
            </div>
            <div className="flex items-center justify-center py-3">
              <div className="flex items-center gap-2 text-xs text-[#64748B] bg-white/80 px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                <ArrowRight className="w-4 h-4" />
                <span>Access from Settings</span>
              </div>
            </div>
          </motion.div>

          {/* Subscription Flow Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionTitle title="Subscription & Payment Flow" color="#F59E0B" />
            <div className="space-y-3">
              {subscriptionFlows.map((card, index) => (
                <div key={card.id}>
                  <FlowCardComponent card={card} index={index} />
                  {index < subscriptionFlows.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center py-3">
              <div className="flex items-center gap-2 text-xs text-[#64748B] bg-white/80 px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                <ArrowRight className="w-4 h-4" />
                <span>Return to Home</span>
              </div>
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SectionTitle title="Support & Help" color="#EC4899" />
            <div className="grid grid-cols-1 gap-3">
              {supportFlows.map((card, index) => (
                <FlowCardComponent key={card.id} card={card} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Connection Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-[#E2E8F0] p-4 mt-4"
          >
            <h4 className="text-sm font-semibold text-[#0F172A] mb-3">Navigation Summary</h4>
            <div className="space-y-2 text-xs text-[#64748B]">
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6] mt-0.5 flex-shrink-0" />
                <p><span className="font-medium text-[#0F172A]">Authentication:</span> Entry point for new and returning users</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22C55E] mt-0.5 flex-shrink-0" />
                <p><span className="font-medium text-[#0F172A]">Main App:</span> Core VPN functionality (connect, servers, settings)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mt-0.5 flex-shrink-0" />
                <p><span className="font-medium text-[#0F172A]">Account:</span> Manage profile, devices, and preferences</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p><span className="font-medium text-[#0F172A]">Payment:</span> 5-step subscription purchase flow</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EC4899] mt-0.5 flex-shrink-0" />
                <p><span className="font-medium text-[#0F172A]">Support:</span> Help resources and contact options</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E2E8F0] p-3 text-center">
              <p className="text-2xl font-bold text-[#0F172A]">22</p>
              <p className="text-xs text-[#64748B]">Total Screens</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E2E8F0] p-3 text-center">
              <p className="text-2xl font-bold text-[#0F172A]">5</p>
              <p className="text-xs text-[#64748B]">Main Flows</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E2E8F0] p-3 text-center">
              <p className="text-2xl font-bold text-[#0F172A]">17</p>
              <p className="text-xs text-[#64748B]">Connections</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}