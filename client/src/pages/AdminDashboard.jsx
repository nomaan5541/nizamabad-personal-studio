import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Upload,
  LogOut,
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  Eye,
  X,
  RefreshCw,
  FileText,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Demo data for when Supabase tables aren't set up yet
const demoMembers = [
  { id: "1", name: "Rahul Kumar", email: "rahul@example.com", phone: "9876543210", plan: "Pro", subscription_active: true, subscription_end: "2026-07-26" },
  { id: "2", name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", plan: "Elite", subscription_active: true, subscription_end: "2026-08-15" },
  { id: "3", name: "Ahmed Ali", email: "ahmed@example.com", phone: "9876543212", plan: "Basic", subscription_active: false, subscription_end: "2026-06-01" },
];

const demoBookings = [
  { id: "1", name: "Vikram Joshi", email: "vikram@email.com", phone: "9876543213", plan: "pro", preferred_time: "6:00 AM - 7:00 AM", status: "pending", created_at: "2026-06-25T10:00:00Z" },
  { id: "2", name: "Sneha Reddy", email: "sneha@email.com", phone: "9876543214", plan: "elite", preferred_time: "7:00 PM - 8:00 PM", status: "pending", created_at: "2026-06-24T14:00:00Z" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { signOut, isAdmin, loading: authLoading } = useAuth();

  const [members, setMembers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  // Upload state
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      // Fetch members
      const { data: membersData } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      setMembers(membersData?.length ? membersData : demoMembers);
      setBookings(bookingsData?.length ? bookingsData : demoBookings);
    } catch {
      setMembers(demoMembers);
      setBookings(demoBookings);
    } finally {
      setLoadingData(false);
    }
  };

  const toggleMember = async (id) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    const newStatus = !member.subscription_active;
    const newEnd = newStatus
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : member.subscription_end;

    try {
      await supabase
        .from("members")
        .update({ subscription_active: newStatus, subscription_end: newEnd })
        .eq("id", id);
    } catch {}

    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, subscription_active: newStatus, subscription_end: newEnd }
          : m
      )
    );
    toast.success(newStatus ? "Activated ✅" : "Deactivated ❌");
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await supabase.from("bookings").update({ status }).eq("id", id);
    } catch {}

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    toast.success(`Booking ${status}!`);
  };

  const uploadTransformation = async () => {
    if (uploading) return;
    if (!before || !after) {
      toast.error("Select both images");
      return;
    }

    try {
      setUploading(true);

      // Upload images to Supabase Storage
      const beforeName = `before_${Date.now()}_${before.name}`;
      const afterName = `after_${Date.now()}_${after.name}`;

      const { data: beforeData } = await supabase.storage
        .from("transformations")
        .upload(beforeName, before);

      const { data: afterData } = await supabase.storage
        .from("transformations")
        .upload(afterName, after);

      const beforeUrl = beforeData
        ? supabase.storage.from("transformations").getPublicUrl(beforeName).data.publicUrl
        : "";
      const afterUrl = afterData
        ? supabase.storage.from("transformations").getPublicUrl(afterName).data.publicUrl
        : "";

      await supabase.from("transformations").insert([
        {
          before_url: beforeUrl,
          after_url: afterUrl,
          title: title || "Transformation",
          description: desc,
        },
      ]);

      toast.success("Uploaded successfully! 🎉");
      setBefore(null);
      setAfter(null);
      setDesc("");
      setTitle("");
    } catch (err) {
      toast.error("Upload failed — check Supabase Storage setup");
    } finally {
      setUploading(false);
    }
  };

  const getDaysLeft = (end) => {
    if (!end) return 0;
    const diff = new Date(end) - new Date();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const activeMembers = members.filter((m) => m.subscription_active).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "members", label: "Members", icon: Users },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "upload", label: "Upload", icon: Upload },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505]">
      {/* Sidebar */}
      <div className="md:w-60 bg-[#0A0A0A] border-r border-[#1E1E1E] p-4 flex md:flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center">
              <span className="text-[#C9A34E] font-bold text-sm">N</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin Panel</p>
              <p className="text-[10px] text-gray-500">Nizamabad PT Studio</p>
            </div>
          </div>

          <div className="flex md:flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 w-full ${
                  activeTab === tab.id
                    ? "bg-[#C9A34E] text-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon size={17} />
                <span className="hidden md:inline">{tab.label}</span>
                {tab.id === "bookings" && pendingBookings > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {pendingBookings}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm mt-6 transition-colors px-3 py-2"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-5 md:p-8 overflow-y-auto">
        {/* ═══════════ OVERVIEW ═══════════ */}
        {activeTab === "overview" && (
          <div className="page-enter">
            <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Dashboard <span className="gradient-text">Overview</span>
            </h1>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {[
                { label: "Total Members", value: members.length, icon: Users, color: "text-blue-400" },
                { label: "Active Subs", value: activeMembers, icon: CheckCircle, color: "text-green-400" },
                { label: "Pending Bookings", value: pendingBookings, icon: Clock, color: "text-amber-400" },
                { label: "Total Bookings", value: bookings.length, icon: TrendingUp, color: "text-purple-400" },
              ].map((stat) => (
                <div key={stat.label} className="card group">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon size={20} className={stat.color} />
                    <span className="text-xs text-gray-500">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Recent Bookings
            </h2>
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="card flex items-center justify-between py-4">
                  <div>
                    <p className="font-semibold text-sm">{b.name}</p>
                    <p className="text-xs text-gray-500">{b.plan?.toUpperCase()} • {b.preferred_time}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    b.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                    b.status === "confirmed" ? "bg-green-500/10 text-green-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ MEMBERS ═══════════ */}
        {activeTab === "members" && (
          <div className="page-enter">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Members
              </h1>
              <button onClick={fetchData} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <RefreshCw size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
              <input
                placeholder="Search member..."
                className="input-field pl-10"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loadingData ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-shimmer h-24 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members
                  .filter((m) =>
                    m.name?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((m) => (
                    <div key={m.id} className="card flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold">{m.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{m.email}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{m.phone}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase ${
                          m.plan === "Elite" ? "bg-amber-500/10 text-amber-400" :
                          m.plan === "Pro" ? "bg-[#C9A34E]/10 text-[#C9A34E]" :
                          "bg-gray-500/10 text-gray-400"
                        }`}>
                          {m.plan || "Basic"}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500">
                        <p>Expires: {m.subscription_end ? new Date(m.subscription_end).toDateString() : "N/A"}</p>
                        <p>Days Left: {getDaysLeft(m.subscription_end)}</p>
                      </div>

                      <button
                        onClick={() => toggleMember(m.id)}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          m.subscription_active
                            ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                        }`}
                      >
                        {m.subscription_active ? (
                          <><CheckCircle size={14} /> Active</>
                        ) : (
                          <><XCircle size={14} /> Inactive</>
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ BOOKINGS ═══════════ */}
        {activeTab === "bookings" && (
          <div className="page-enter">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Bookings
            </h1>

            {loadingData ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-shimmer h-24 rounded-2xl" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                <p>No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="card">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-bold">{b.name}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            b.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                            b.status === "confirmed" ? "bg-green-500/10 text-green-400" :
                            "bg-red-500/10 text-red-400"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span>{b.email}</span>
                          <span>{b.phone}</span>
                          <span className="text-[#C9A34E]">{b.plan?.toUpperCase()}</span>
                          <span className="flex items-center gap-1"><Clock size={10} />{b.preferred_time}</span>
                        </div>
                        {b.message && (
                          <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                            <FileText size={10} className="mt-0.5 shrink-0" />
                            {b.message}
                          </p>
                        )}
                      </div>

                      {b.status === "pending" && (
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => updateBookingStatus(b.id, "confirmed")}
                            className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium hover:bg-green-500/20 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, "cancelled")}
                            className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium hover:bg-red-500/20 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ UPLOAD ═══════════ */}
        {activeTab === "upload" && (
          <div className="page-enter flex justify-center items-start py-10">
            <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1E1E1E] rounded-3xl p-8 shadow-2xl">
              <h1 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Upload <span className="gradient-text">Transformation</span>
              </h1>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 font-medium mb-2 block">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 12 Week Transformation"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 font-medium mb-2 block">Before Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBefore(e.target.files[0])}
                    className="w-full text-sm bg-[#111] border border-[#1E1E1E] rounded-xl p-3 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#C9A34E]/10 file:text-[#C9A34E] file:text-xs file:font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 font-medium mb-2 block">After Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAfter(e.target.files[0])}
                    className="w-full text-sm bg-[#111] border border-[#1E1E1E] rounded-xl p-3 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#C9A34E]/10 file:text-[#C9A34E] file:text-xs file:font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 font-medium mb-2 block">Description</label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe the transformation..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  onClick={uploadTransformation}
                  disabled={uploading}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    uploading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "btn-primary"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload Transformation"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
