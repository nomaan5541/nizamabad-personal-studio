import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserLogin from "./pages/UserLogin";
import Transformations from "./pages/Transformations";
import AdminDashboard from "./pages/AdminDashboard";
import UserRegister from "./pages/UserRegister";

// ✅ Header
import Header from "./components/Header";

// 🔥 Toast
import { Toaster } from "react-hot-toast";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      {/* ✅ GLOBAL HEADER */}
      <Header />

      {/* 🔥 GLOBAL TOAST */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "10px 14px",
          },
          success: {
            iconTheme: {
              primary: "#C9A34E",
              secondary: "black",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
        }}
      />

      {/* ✅ CONTENT WRAPPER (prevents header overlap) */}
      <div className="pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/register" element={<UserRegister />} />

          <Route path="/admin" element={<Login setToken={setToken} />} />

          <Route
            path="/admin-dashboard"
            element={
              token ? (
                <AdminDashboard token={token} />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard token={token} />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
