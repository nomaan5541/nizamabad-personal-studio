import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard({ token }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [activeTab, setActiveTab] = useState("members");

  // upload states
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [desc, setDesc] = useState("");

  // ✅ FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data);
    } catch (err) {
      setMsg("Failed to load members ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ TOGGLE
  const toggle = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/members/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMembers((prev) => prev.map((m) => (m._id === id ? res.data : m)));

      setMsg(res.data.isActive ? "Activated ✅" : "Deactivated ❌");
      setTimeout(() => setMsg(""), 1500);
    } catch {
      setMsg("Toggle failed ❌");
    }
  };

  // ✅ UPLOAD TRANSFORMATION
  const uploadTransformation = async () => {
    if (!before || !after) {
      setMsg("Select both images ❌");
      return;
    }

    try {
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

      setMsg("Uploaded successfully ✅");

      // reset
      setBefore(null);
      setAfter(null);
      setDesc("");
    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data || err);
      setMsg(err.response?.data?.msg || "Upload failed ❌");
    }
  };

  useEffect(() => {
    if (token) fetchMembers();
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* 🔹 SIDEBAR */}
      <div className="w-48 bg-gray-900 p-4 space-y-4">
        <h2 className="text-xl mb-6">Admin</h2>

        <button
          onClick={() => setActiveTab("members")}
          className="block w-full text-left hover:text-gray-400"
        >
          Members
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className="block w-full text-left hover:text-gray-400"
        >
          Upload Transformations
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin";
          }}
          className="mt-10 text-red-400"
        >
          Logout
        </button>
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="flex-1 p-6">
        {msg && <p className="text-center text-sm text-red-400 mb-4">{msg}</p>}

        {/* ================= MEMBERS ================= */}
        {activeTab === "members" && (
          <>
            <h1 className="text-2xl mb-6">Members</h1>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {members.map((m) => (
                  <div
                    key={m._id}
                    className="bg-gray-900 p-5 rounded-xl flex justify-between"
                  >
                    <div>
                      <p>{m.name}</p>
                      <p className="text-sm text-gray-400">{m.email}</p>
                      <p className="text-xs text-gray-500">
                        Expires:{" "}
                        {m.expiryDate
                          ? new Date(m.expiryDate).toDateString()
                          : "N/A"}
                      </p>
                    </div>

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
            )}
          </>
        )}

        {/* ================= UPLOAD ================= */}
        {activeTab === "upload" && (
          <div className="max-w-md">
            <h1 className="text-2xl mb-6">Upload Transformation</h1>

            <input
              type="file"
              onChange={(e) => setBefore(e.target.files[0])}
              className="mb-3"
            />

            <input
              type="file"
              onChange={(e) => setAfter(e.target.files[0])}
              className="mb-3"
            />

            <input
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 mb-3 bg-black border"
            />

            <button
              onClick={uploadTransformation}
              className="w-full bg-white text-black py-2"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
