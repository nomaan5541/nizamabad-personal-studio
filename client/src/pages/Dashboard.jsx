import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ token }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    plan: "Monthly",
    startDate: "",
  });

  // ✅ Fetch Members
  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:5000/api/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMembers(res.data);
  };

  // ✅ Add Member
  const addMember = async () => {
    if (!form.name || !form.phone || !form.startDate) {
      alert("Fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/api/members", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm({
      name: "",
      phone: "",
      plan: "Monthly",
      startDate: "",
    });

    fetchMembers();
  };

  // ✅ Toggle Subscription
  const toggle = async (id) => {
    await axios.put(
      `http://localhost:5000/api/members/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* 🔐 Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="mb-6 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>

      <h1 className="text-2xl mb-6">Admin Dashboard</h1>

      {/* ➕ Add Member */}
      <div className="mb-6 bg-gray-900 p-4 rounded">
        <h2 className="mb-3 text-lg">Add Member</h2>

        <div className="flex flex-wrap gap-2">
          <input
            placeholder="Name"
            className="p-2 bg-black border border-gray-700"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Phone"
            className="p-2 bg-black border border-gray-700"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="date"
            className="p-2 bg-black border border-gray-700"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />

          <button onClick={addMember} className="bg-white text-black px-4 py-2">
            Add
          </button>
        </div>
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="Search member..."
        className="p-2 mb-6 bg-black border border-gray-700 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 👥 Members List */}
      <div className="space-y-4">
        {members
          .filter((m) => m.name?.toLowerCase().includes(search.toLowerCase()))
          .map((m) => (
            <div
              key={m._id}
              className="p-4 bg-gray-900 rounded flex justify-between items-center border border-gray-800"
            >
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-gray-400">{m.phone}</p>

                <p className="text-sm text-gray-500">
                  Expires:{" "}
                  {m.expiryDate ? new Date(m.expiryDate).toDateString() : "N/A"}
                </p>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/91${m.phone}`}
                  target="_blank"
                  className="text-green-400 text-sm"
                >
                  WhatsApp
                </a>
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggle(m._id)}
                className={`px-4 py-2 rounded ${
                  m.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {m.isActive ? "Active" : "Inactive"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
