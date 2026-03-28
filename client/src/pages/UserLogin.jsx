import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/customers/login",
        { email, password },
      );

      localStorage.setItem("userToken", res.data.token);

      setMsg("Login successful ✅");

      // ✅ REDIRECT TO HOME
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMsg("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-80">
        <h2 className="mb-4">Member Login</h2>

        {msg && <p className="mb-3 text-center text-sm text-red-400">{msg}</p>}

        <input
          className="w-full p-2 mb-3 bg-black border"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-black border"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="w-full bg-white text-black py-2">
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Signup</span>
        </p>
      </div>
    </div>
  );
}
