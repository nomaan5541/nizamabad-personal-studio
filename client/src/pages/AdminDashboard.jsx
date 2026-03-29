import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Users,
  Upload,
  LogOut,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard({ token }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("members");
  const [search, setSearch] = useState("");

  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [desc, setDesc] = useState("");

  const [resetKey, setResetKey] = useState(Date.now());
  const [uploading, setUploading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  // 🔥 DAYS LEFT
  const getDaysLeft = (end) => {
    if (!end) return "N/A";
    const diff = new Date(end) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  // ✅ FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data);
    } catch {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 TOGGLE
  const toggle = async (id) => {
    if (togglingId === id) return;

    try {
      setTogglingId(id);

      const res = await axios.put(
        `http://localhost:5000/api/members/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMembers((prev) => prev.map((m) => (m._id === id ? res.data : m)));

      toast.success(
        res.data.subscriptionActive ? "Activated ✅" : "Deactivated ❌",
      );
    } catch {
      toast.error("Toggle failed");
    } finally {
      setTogglingId(null);
    }
  };

  // 🔥 UPLOAD
  const uploadTransformation = async () => {
    if (uploading) return;

    if (!before || !after) {
      toast.error("Select both images");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("before", before);
      formData.append("after", after);
      formData.append("description", desc);

      await axios.post("http://localhost:5000/api/transformations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Uploaded successfully");

      // RESET
      setBefore(null);
      setAfter(null);
      setDesc("");
      setResetKey(Date.now());
    } catch (err) {
      toast.error(err.response?.data?.msg || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMembers();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div className="md:w-56 bg-[#111] border-r border-gray-800 p-4 flex md:flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-6">Admin</h2>

          <div className="flex md:flex-col gap-2">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeTab === "members"
                  ? "bg-[#C9A34E] text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              <Users size={18} /> Members
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeTab === "upload"
                  ? "bg-[#C9A34E] text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              <Upload size={18} /> Upload
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin";
          }}
          className="flex items-center gap-2 text-red-400 mt-6"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8">
        {/* ================= MEMBERS ================= */}
        {activeTab === "members" && (
          <>
            <h1 className="text-3xl font-semibold mb-6">Members</h1>

            {/* SEARCH */}
            <div className="relative mb-6 max-w-md">
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                placeholder="Search member..."
                className="w-full pl-10 pr-3 py-2 bg-black border border-gray-700 rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members
                  .filter((m) =>
                    m.name?.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((m) => (
                    <div
                      key={m._id}
                      className="bg-[#111] border border-gray-800 p-4 rounded-xl flex flex-col gap-3"
                    >
                      <div>
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-sm text-gray-400">{m.email}</p>

                        <p className="text-xs text-gray-500 mt-1">
                          Expires:{" "}
                          {m.subscriptionEnd
                            ? new Date(m.subscriptionEnd).toDateString()
                            : "N/A"}
                        </p>

                        <p className="text-xs text-gray-400">
                          Days Left: {getDaysLeft(m.subscriptionEnd)}
                        </p>
                      </div>

                      <button
                        onClick={() => toggle(m._id)}
                        disabled={togglingId === m._id}
                        className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm ${
                          togglingId === m._id
                            ? "bg-gray-700 text-gray-400"
                            : m.subscriptionActive
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      >
                        {togglingId === m._id ? (
                          "Updating..."
                        ) : m.subscriptionActive ? (
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
                  ))}
              </div>
            )}
          </>
        )}

        {/* ================= UPLOAD ================= */}
        {activeTab === "upload" && (
          <div className="flex justify-center items-center min-h-[70vh]">
            <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-lg">
              <h1 className="text-2xl font-semibold mb-6 text-center">
                Upload Transformation
              </h1>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Before Image</label>
                  <input
                    key={resetKey + "-before"}
                    type="file"
                    onChange={(e) => setBefore(e.target.files[0])}
                    className="w-full mt-1 text-sm bg-black border border-gray-700 rounded-lg p-2 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">After Image</label>
                  <input
                    key={resetKey + "-after"}
                    type="file"
                    onChange={(e) => setAfter(e.target.files[0])}
                    className="w-full mt-1 text-sm bg-black border border-gray-700 rounded-lg p-2 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Description</label>
                  <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Transformation details"
                    className="w-full mt-1 p-2 bg-black border border-gray-700 rounded-lg"
                  />
                </div>

                <button
                  onClick={uploadTransformation}
                  disabled={uploading}
                  className={`w-full py-2 rounded-lg font-semibold ${
                    uploading
                      ? "bg-gray-700 text-gray-400"
                      : "bg-[#C9A34E] text-black"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
