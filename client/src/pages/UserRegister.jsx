import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/customers/register", // ✅ FIXED
        form,
      );

      setMsg("Registered successfully ✅");

      // ✅ Redirect to login (correct flow)
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-80">
        <h2 className="mb-4">Register</h2>

        {msg && <p className="mb-3 text-center text-sm text-red-400">{msg}</p>}

        <input
          placeholder="Name"
          className="w-full p-2 mb-3 bg-black border"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 bg-black border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="w-full p-2 mb-3 bg-black border"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 bg-black border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={register} className="w-full bg-white text-black py-2">
          Register
        </button>
      </div>
    </div>
  );
}
