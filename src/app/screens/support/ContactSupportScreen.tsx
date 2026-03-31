import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle, Mail, FileText, Send, CheckCircle } from "lucide-react";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";

type ContactMethod = "chat" | "email" | "ticket";

export function ContactSupportScreen() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      id: "chat" as ContactMethod,
      name: "Live Chat",
      icon: MessageCircle,
      description: "Get instant help from our team",
      availability: "Available 24/7",
      color: "from-[#22C55E] to-[#16A34A]",
    },
    {
      id: "email" as ContactMethod,
      name: "Email Support",
      icon: Mail,
      description: "Send us a detailed message",
      availability: "Response within 24h",
      color: "from-[#3B82F6] to-[#2563EB]",
    },
    {
      id: "ticket" as ContactMethod,
      name: "Submit Ticket",
      icon: FileText,
      description: "Create a support request",
      availability: "Track your issue",
      color: "from-[#F59E0B] to-[#EF4444]",
    },
  ];

  const handleStartChat = () => {
    toast.success("Connecting to live chat...");
    setTimeout(() => {
      toast.info("Chat feature is in demo mode");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Your message has been sent!");
    }, 1000);
  };

  const handleBack = () => {
    if (selectedMethod && !submitted) {
      setSelectedMethod(null);
    } else {
      navigate("/settings");
    }
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col relative overflow-hidden">
        <AnimatedBackground variant="green" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl text-[#0F172A] font-bold mb-3">Message Sent!</h1>
            <p className="text-[#64748B] mb-6">
              We've received your message and will get back to you soon.
            </p>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/50 mb-6">
              <p className="text-sm text-[#64748B] mb-2">Ticket Number</p>
              <p className="text-2xl text-[#0F172A] font-mono font-bold">
                #VPN-{Math.floor(Math.random() * 10000).toString().padStart(4, "0")}
              </p>
            </div>

            <button
              onClick={() => navigate("/settings")}
              className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl p-4 font-medium shadow-xl shadow-green-500/30"
            >
              Back to Settings
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="blue" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
          </motion.button>
          <div>
            <h1 className="text-2xl text-[#0F172A]">Contact Support</h1>
            <p className="text-sm text-[#64748B]">We're here to help 24/7</p>
          </div>
        </div>

        {!selectedMethod ? (
          <div className="flex-1 space-y-4 overflow-y-auto">
            <p className="text-[#64748B] mb-4">Choose how you'd like to reach us:</p>

            {contactMethods.map((method, index) => (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (method.id === "chat") {
                    handleStartChat();
                  } else {
                    setSelectedMethod(method.id);
                  }
                }}
                className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/50 hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-lg text-[#0F172A] font-medium">{method.name}</p>
                    <p className="text-sm text-[#64748B]">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <p className="text-sm text-[#64748B]">{method.availability}</p>
                  {method.id === "chat" && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                      <p className="text-xs text-[#22C55E] font-medium">Online</p>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto space-y-5 mb-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-white/50 space-y-5">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-[#0F172A] mb-2 block">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-[#F8FAFC] border-2 border-[#E2E8F0] h-12"
                  />
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject" className="text-[#0F172A] mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What can we help you with?"
                    className="bg-[#F8FAFC] border-2 border-[#E2E8F0] h-12"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-[#0F172A] mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    className="bg-[#F8FAFC] border-2 border-[#E2E8F0] min-h-[150px] resize-none"
                  />
                </div>

                {/* Quick Topics */}
                <div>
                  <p className="text-sm text-[#64748B] mb-3">Quick topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Connection Issues", "Billing Question", "Account Help", "Technical Support"].map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSubject(topic)}
                        className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl p-4 font-medium shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
