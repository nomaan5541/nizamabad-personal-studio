import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = ["home", "services", "results", "contact"];

        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop - 140;
            if (window.scrollY >= top) {
              setActive(id);
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollToSection = (id) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* 🔥 LOGO SECTION */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img
            src="/logo.png"
            alt="Nizamabad PT Studio"
            className="h-10 w-auto object-contain"
          />

          {/* Optional Text beside logo */}
          <span className="hidden sm:block text-white font-semibold tracking-wide">
            Nizamabad PT Studio
          </span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button
            onClick={() => scrollToSection("home")}
            className={`transition ${
              active === "home"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className={`transition ${
              active === "services"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Services
          </button>

          <button
            onClick={() => scrollToSection("results")}
            className={`transition ${
              active === "results"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Results
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={`transition ${
              active === "contact"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Contact
          </button>

          {/* CTA */}
          <button
            onClick={() => navigate("/login")}
            className="bg-[#C9A34E] text-black px-5 py-2 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition"
          >
            Join Now
          </button>
        </nav>

        {/* MOBILE ICON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-6 space-y-5 text-center">
          <button
            onClick={() => scrollToSection("home")}
            className="block w-full text-gray-300 hover:text-white"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className="block w-full text-gray-300 hover:text-white"
          >
            Services
          </button>

          <button
            onClick={() => scrollToSection("results")}
            className="block w-full text-gray-300 hover:text-white"
          >
            Results
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="block w-full text-gray-300 hover:text-white"
          >
            Contact
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            className="w-full bg-[#C9A34E] text-black py-2 rounded-xl font-medium"
          >
            Join Now
          </button>
        </div>
      )}
    </header>
  );
}
