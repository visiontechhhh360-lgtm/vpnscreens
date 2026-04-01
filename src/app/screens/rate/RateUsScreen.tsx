import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";
import { AnimatedBackground } from "../../components/AnimatedBackground";

export function RateUsScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success("Thank you for your feedback!");
    navigate("/main/settings");
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 pb-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/main/settings")} className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#0F172A]" />
        </button>
        <h1 className="text-2xl text-[#0F172A]">Rate Us</h1>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-3xl flex items-center justify-center shadow-lg">
              <Star className="w-12 h-12 text-white fill-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl text-[#0F172A] mb-2">Enjoying PureVPN VT?</h2>
            <p className="text-[#64748B]">Your feedback helps us improve</p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                whileTap={{ scale: 0.9 }}
                className="p-2"
              >
                <Star
                  className={`w-12 h-12 transition-all ${
                    star <= (hoveredRating || rating)
                      ? "text-[#F59E0B] fill-[#F59E0B]"
                      : "text-[#E2E8F0]"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Rating Text */}
          <div className="text-center mb-6">
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-[#0F172A] font-medium"
              >
                {rating === 5 && "Excellent! 🎉"}
                {rating === 4 && "Great! 👍"}
                {rating === 3 && "Good 👌"}
                {rating === 2 && "Fair 🤔"}
                {rating === 1 && "Needs Improvement 😔"}
              </motion.p>
            )}
          </div>

          {/* Feedback Textarea */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
            <p className="text-sm text-[#64748B] mb-2">Additional Feedback (Optional)</p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think..."
              rows={5}
              className="w-full bg-transparent text-[#0F172A] placeholder:text-[#64748B] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 bg-[#22C55E] text-white rounded-xl font-medium shadow-lg shadow-[#22C55E]/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </motion.button>
      </motion.div>
      </div>
    </div>
  );
}