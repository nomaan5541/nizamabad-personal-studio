import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/customers/register",
        form,
      );

      // 🔥 Success Toast
      toast.success("Registration successful 🎉");

      // ✅ Redirect to HOME (your requirement)
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Card */}
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            placeholder="Name"
            className="input-field"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="input-field"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Phone"
            className="input-field"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Button */}
        <button onClick={register} className="btn-primary w-full mt-6">
          Register
        </button>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#C9A34E] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
