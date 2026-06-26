import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Zap,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "6,499",
    icon: Zap,
    color: "gray",
  },
  {
    id: "pro",
    name: "Pro",
    price: "8,999",
    icon: Star,
    color: "gold",
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: "12,999",
    icon: Crown,
    color: "amber",
  },
];

const timeSlots = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
];

export default function BookingPage() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "pro",
    preferred_time: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.preferred_time) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const { error } = await supabase.from("bookings").insert([
        {
          user_id: user?.id || null,
          name: form.name,
          email: form.email,
          phone: form.phone,
          plan: form.plan,
          preferred_time: form.preferred_time,
          message: form.message,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("Booking submitted successfully! 🎉");
      setSubmitted(true);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 bg-[#050505]">
        <div
          className={`text-center max-w-md transition-all duration-700 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C9A34E]/10 border border-[#C9A34E]/30 flex items-center justify-center animate-pulse-glow">
            <Check size={36} className="text-[#C9A34E]" />
          </div>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Booking <span className="gradient-text">Confirmed!</span>
          </h2>
          <p className="text-gray-400 mb-8">
            We've received your booking request. Our team will contact you
            within 24 hours to confirm your session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/")} className="btn-primary px-8">
              Back to Home
            </button>
            <a
              href="https://wa.me/917396854458"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-[-200px] right-[-200px] opacity-20" />
      <div className="glow-orb glow-orb-white w-[300px] h-[300px] bottom-[10%] left-[-100px] opacity-10" />

      <div className="max-w-4xl mx-auto px-5 py-10 relative z-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-all duration-500 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-tag">Book A Session</p>
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Start Your <span className="gradient-text">Transformation</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Fill in the details below and our team will get back to you within
            24 hours.
          </p>
        </div>

        {/* Google Sign In (optional) */}
        {!user && (
          <div
            className={`text-center mb-8 transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <button
              onClick={signInWithGoogle}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google (auto-fill)
            </button>
            <p className="text-gray-600 text-xs mt-2">
              Optional — fills your name & email automatically
            </p>
          </div>
        )}

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`space-y-8 transition-all duration-700 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Plan Selection */}
          <div>
            <label className="text-sm text-gray-300 font-medium mb-3 block">
              Select Your Plan *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setForm({ ...form, plan: plan.id })}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 text-left ${
                    form.plan === plan.id
                      ? "border-[#C9A34E] bg-[#C9A34E]/5 shadow-lg"
                      : "border-[#1E1E1E] bg-[#111] hover:border-[#333]"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2 right-3 text-[10px] bg-[#C9A34E] text-black px-2 py-0.5 rounded-full font-bold">
                      POPULAR
                    </span>
                  )}
                  <plan.icon
                    size={20}
                    className={
                      form.plan === plan.id
                        ? "text-[#C9A34E] mb-2"
                        : "text-gray-500 mb-2"
                    }
                  />
                  <p className="font-bold text-sm">{plan.name}</p>
                  <p className="text-[#C9A34E] text-xs mt-1">₹{plan.price}/mo</p>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-300 font-medium mb-2 block">
                Full Name *
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-3.5 text-gray-500"
                  size={16}
                />
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="input-field pl-10"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 font-medium mb-2 block">
                Email *
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-3.5 text-gray-500"
                  size={16}
                />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="input-field pl-10"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 font-medium mb-2 block">
              Phone Number *
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3.5 top-3.5 text-gray-500"
                size={16}
              />
              <input
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                className="input-field pl-10"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-sm text-gray-300 font-medium mb-3 block">
              <Clock size={14} className="inline mr-1" />
              Preferred Time Slot *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm({ ...form, preferred_time: slot })}
                  className={`px-1 py-2.5 sm:px-3 rounded-xl text-[10px] sm:text-xs font-medium border transition-all duration-300 ${
                    form.preferred_time === slot
                      ? "border-[#C9A34E] bg-[#C9A34E]/10 text-[#C9A34E]"
                      : "border-[#1E1E1E] text-gray-400 hover:border-[#333] hover:text-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-300 font-medium mb-2 block">
              Message (Optional)
            </label>
            <div className="relative">
              <MessageSquare
                className="absolute left-3.5 top-3.5 text-gray-500"
                size={16}
              />
              <textarea
                rows={3}
                placeholder="Tell us about your fitness goals..."
                className="input-field pl-10 resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
              submitting
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                <Sparkles size={20} />
                Book Your Session — ₹{plans.find(p => p.id === form.plan)?.price || "6,499"}/mo
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
