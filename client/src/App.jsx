import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";

import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";

import { Toaster } from "react-hot-toast";

function ProtectedAdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="animate-pulse-glow w-12 h-12 rounded-full bg-[#C9A34E]/20 border border-[#C9A34E]/30" />
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/admin" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/admin" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Global Header */}
        <Header />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#F5F5F5",
              border: "1px solid #1E1E1E",
              borderRadius: "16px",
              padding: "12px 16px",
              fontSize: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            },
            success: {
              iconTheme: {
                primary: "#C9A34E",
                secondary: "#050505",
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

        {/* Content */}
        <div className="pt-16 md:pt-[60px]">
          <AppRoutes />
        </div>

        {/* Global WhatsApp Button */}
        <WhatsAppButton />
      </Router>
    </AuthProvider>
  );
}
