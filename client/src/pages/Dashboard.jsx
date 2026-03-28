import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  LogOut,
  UserPlus,
  Search,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Dashboard({ token }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    plan: "Monthly",
    startDate: "",
  });

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data);
    } catch {
      toast.error("Failed to fetch members");
    }
  };

  const addMember = async () => {
    if (!form.name || !form.phone || !form.startDate) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/members", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Member added successfully");

      setForm({
        name: "",
        phone: "",
        plan: "Monthly",
        startDate: "",
      });

      fetchMembers();
    } catch {
      toast.error("Failed to add member");
    }
  };

  const toggle = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/members/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Status updated");
      fetchMembers();
    } catch {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 md:px-10">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Add Member */}
      <div className="card mb-8">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <UserPlus size={18} /> Add Member
        </h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            placeholder="Name"
            className="input-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Phone"
            className="input-field"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="date"
            className="input-field"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />

          <button onClick={addMember} className="btn-primary w-full">
            Add
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input
          placeholder="Search member..."
          className="input-field pl-10 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Members */}
      <div className="grid gap-4 md:grid-cols-2">
        {members
          .filter((m) => m.name?.toLowerCase().includes(search.toLowerCase()))
          .map((m) => (
            <div key={m._id} className="card flex flex-col gap-4">
              {/* Info */}
              <div>
                <p className="text-lg font-semibold">{m.name}</p>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                  <Phone size={14} />
                  {m.phone}
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <Calendar size={14} />
                  {m.expiryDate
                    ? new Date(m.expiryDate).toDateString()
                    : "No expiry"}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <a
                  href={`https://wa.me/91${m.phone}`}
                  target="_blank"
                  className="text-green-400 text-sm hover:underline"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => toggle(m._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer ${
                    m.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {m.isActive ? (
                    <>
                      <CheckCircle size={16} /> Active
                    </>
                  ) : (
                    <>
                      <XCircle size={16} /> Inactive
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
