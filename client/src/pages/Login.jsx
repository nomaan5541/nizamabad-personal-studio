import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      // ✅ redirect to dashboard
      navigate("/admin-dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 bg-gray-900 rounded-xl w-80 border border-gray-800">
        <h2 className="text-xl mb-4 text-center">Admin Login</h2>

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <p className="mb-3 text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
