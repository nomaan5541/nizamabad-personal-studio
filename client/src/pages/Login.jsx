import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail } from "lucide-react";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 800);
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* 🔥 Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-[#C9A34E]/20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-white/10 blur-[100px] bottom-[-80px] right-[-80px]" />

      {/* Card */}
      <div className="relative w-full max-w-sm p-6 md:p-8 rounded-2xl bg-[#111]/80 backdrop-blur border border-gray-800 shadow-xl">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#C9A34E]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#C9A34E]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-[#C9A34E] text-black font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
