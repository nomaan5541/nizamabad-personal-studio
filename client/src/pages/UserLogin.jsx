import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("${API}/api/customers/login", {
        email,
        password,
      });

      // ✅ Store token
      localStorage.setItem("userToken", res.data.token);

      // 🔥 Toast
      toast.success("Login successful 🎉");

      // ✅ Redirect to home
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Card */}
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Member Login
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            className="input-field"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input-field"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button onClick={login} className="btn-primary w-full mt-6">
          Login
        </button>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#C9A34E] cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
