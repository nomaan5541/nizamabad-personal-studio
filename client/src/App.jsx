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

export default function App() {
  const [token, setToken] = useState(null);

  // ✅ Load token once on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/transformations" element={<Transformations />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Admin Login */}
        <Route path="/admin" element={<Login setToken={setToken} />} />

        {/* ✅ Protected Admin Dashboard */}
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

        {/* Optional Dashboard */}
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
    </Router>
  );
}
