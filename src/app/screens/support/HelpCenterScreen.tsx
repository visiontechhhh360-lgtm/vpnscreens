import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, ChevronDown, HelpCircle, Wifi, CreditCard, User, Shield } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { Input } from "../../components/ui/input";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: typeof Wifi;
  color: string;
  items: FAQItem[];
}

export function HelpCenterScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("connection");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const categories: FAQCategory[] = [
    {
      id: "connection",
      name: "Connection Issues",
      icon: Wifi,
      color: "from-[#22C55E] to-[#16A34A]",
      items: [
        {
          question: "Why can't I connect to the VPN?",
          answer: "First, check your internet connection. If you're connected to the internet but still can't connect to VPN, try switching to a different server location. You can also try restarting the app or your device.",
        },
        {
          question: "VPN keeps disconnecting",
          answer: "Frequent disconnections can be caused by poor internet connection, firewall settings, or network restrictions. Try using a different protocol in Settings > Advanced, or switch to a different server location.",
        },
        {
          question: "Slow connection speed",
          answer: "For better speeds, connect to a server closer to your physical location. Also check if you're using the fastest protocol (WireGuard is recommended) in Settings > Advanced. If you're on the free plan, upgrading to Premium will remove speed restrictions.",
        },
        {
          question: "Connection timeout error",
          answer: "This usually means the server is temporarily unavailable or overloaded. Try connecting to a different server. If the issue persists across multiple servers, check your firewall settings or contact support.",
        },
      ],
    },
    {
      id: "billing",
      name: "Billing Issues",
      icon: CreditCard,
      color: "from-[#3B82F6] to-[#2563EB]",
      items: [
        {
          question: "How do I cancel my subscription?",
          answer: "Go to Settings > Account > Manage Subscription. From there, you can cancel your subscription. Your Premium features will remain active until the end of your billing period.",
        },
        {
          question: "Refund policy",
          answer: "We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days of your subscription, contact our support team for a full refund.",
        },
        {
          question: "Payment failed",
          answer: "If your payment fails, check that your card details are correct and that you have sufficient funds. You can update your payment method in Settings > Account > Payment Methods.",
        },
        {
          question: "Billing cycle questions",
          answer: "Monthly subscriptions renew every 30 days, and yearly subscriptions renew every 365 days from your purchase date. You'll receive an email reminder 7 days before renewal.",
        },
      ],
    },
    {
      id: "account",
      name: "Account Help",
      icon: User,
      color: "from-[#F59E0B] to-[#EF4444]",
      items: [
        {
          question: "How do I change my password?",
          answer: "Go to Settings > Account > Change Password. You'll need to enter your current password and then your new password twice to confirm the change.",
        },
        {
          question: "Can I use VPN on multiple devices?",
          answer: "Yes! Premium users can connect up to 10 devices simultaneously. Free users can use the VPN on one device at a time. You can manage your devices in Settings > Devices.",
        },
        {
          question: "Forgot my password",
          answer: "On the login screen, tap 'Forgot Password' and enter your email. We'll send you a link to reset your password. If you don't receive the email, check your spam folder.",
        },
        {
          question: "How to delete my account?",
          answer: "Go to Settings > Account > Delete Account. Please note this action is permanent and cannot be undone. All your data will be permanently deleted.",
        },
      ],
    },
    {
      id: "security",
      name: "Security & Privacy",
      icon: Shield,
      color: "from-[#8B5CF6] to-[#7C3AED]",
      items: [
        {
          question: "Is my data encrypted?",
          answer: "Yes! We use AES-256 encryption, the same standard used by banks and governments. All your internet traffic is encrypted from your device to our VPN servers.",
        },
        {
          question: "Do you log my activity?",
          answer: "No. We have a strict no-logs policy. We don't track, collect, or store your browsing activity, connection logs, or IP addresses.",
        },
        {
          question: "What is a kill switch?",
          answer: "The kill switch automatically disconnects your internet if the VPN connection drops, preventing your real IP address from being exposed. You can enable it in Settings > Advanced > Kill Switch.",
        },
        {
          question: "Which protocol should I use?",
          answer: "We recommend WireGuard for the best balance of speed and security. OpenVPN is a reliable alternative. IKEv2 works well on mobile devices. You can change protocols in Settings > Advanced.",
        },
      ],
    },
  ];

  const filteredCategories = categories.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleQuestion = (question: string) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/main/settings")}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
          </motion.button>
          <div>
            <h1 className="text-2xl text-[#0F172A]">Help Center</h1>
            <p className="text-sm text-[#64748B]">Find answers to common questions</p>
          </div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="pl-12 bg-white/90 backdrop-blur-sm border-2 border-white/50 h-12 shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredCategories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <HelpCircle className="w-16 h-16 text-[#94A3B8] mb-4" />
              <p className="text-[#64748B] text-center">No results found for "{searchQuery}"</p>
            </motion.div>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-white/50 overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-[#F8FAFC]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[#0F172A] font-medium">{category.name}</p>
                      <p className="text-sm text-[#64748B]">{category.items.length} articles</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#64748B]" />
                  </motion.div>
                </button>

                {/* Questions */}
                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-[#E2E8F0]"
                    >
                      {category.items.map((item, index) => (
                        <div key={index} className="border-b border-[#E2E8F0] last:border-b-0">
                          <button
                            onClick={() => toggleQuestion(`${category.id}-${index}`)}
                            className="w-full p-4 text-left hover:bg-[#F8FAFC]/50 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-[#0F172A] font-medium pr-2">{item.question}</p>
                              <motion.div
                                animate={{
                                  rotate: expandedQuestion === `${category.id}-${index}` ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                              >
                                <ChevronDown className="w-4 h-4 text-[#64748B]" />
                              </motion.div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedQuestion === `${category.id}-${index}` && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4">
                                  <p className="text-sm text-[#64748B] leading-relaxed">{item.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-2xl p-5 shadow-xl">
            <p className="text-white font-medium mb-2">Still need help?</p>
            <p className="text-white/80 text-sm mb-4">Our support team is available 24/7</p>
            <button
              onClick={() => navigate("/main/contact-support")}
              className="w-full bg-white text-[#3B82F6] rounded-xl p-3 font-medium"
            >
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}