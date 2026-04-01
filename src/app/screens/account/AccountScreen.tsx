import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Crown, Calendar, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

export function AccountScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const getStatusBadge = () => {
    switch (user?.subscriptionStatus) {
      case "premium":
        return { text: "Premium", color: "bg-[#F59E0B] text-white" };
      case "trial":
        return { text: "Trial", color: "bg-[#3B82F6] text-white" };
      default:
        return { text: "Free", color: "bg-[#64748B] text-white" };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/main/settings")} className="p-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-2xl text-foreground">Account</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-lg font-medium">{user?.email}</p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${badge.color}`}>
              {badge.text}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3 flex-1"
      >
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-5 h-5 text-[#F59E0B]" />
            <p className="text-sm text-muted-foreground">Subscription Status</p>
          </div>
          <p className="text-foreground font-medium capitalize">{user?.subscriptionStatus}</p>
        </div>

        {user?.subscriptionExpiry && (
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#3B82F6]" />
              <p className="text-sm text-muted-foreground">Expiry Date</p>
            </div>
            <p className="text-foreground font-medium">{user.subscriptionExpiry}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/main/subscription")}
          className="w-full bg-[#22C55E] text-white rounded-xl p-4 font-medium"
        >
          Manage Subscription
        </button>
      </motion.div>

      {/* Logout Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-[#EF4444] text-white rounded-xl p-4 font-medium flex items-center justify-center gap-2 mt-4"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You'll need to sign in again to use the app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}
