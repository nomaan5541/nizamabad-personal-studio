import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { signInWithEmail, isAdmin } = useAuth();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin-dashboard");
    }
  }, [isAdmin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmail(email, password);
      toast.success("Login successful ✅");
      setTimeout(() => navigate("/admin-dashboard"), 500);
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 relative overflow-hidden bg-[#050505]">
      {/* Ambient Glow */}
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-[-200px] left-[-200px] opacity-20" />
      <div className="glow-orb glow-orb-white w-[300px] h-[300px] bottom-[-100px] right-[-100px] opacity-10" />

      <div className={`relative z-10 w-full max-w-sm transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* Card */}
        <div className="p-8 rounded-3xl glass-strong shadow-2xl border border-white/5">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center">
              <Lock size={24} className="text-[#C9A34E]" />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Admin Login
            </h2>
            <p className="text-gray-500 text-sm mt-1">Access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
              <input
                type="email"
                placeholder="ptstudio@gmail.com"
                className="input-field pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
              <input
                type="password"
                placeholder="Password"
                className="input-field pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "btn-primary"
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
