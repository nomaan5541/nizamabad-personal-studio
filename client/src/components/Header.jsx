import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "services", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          if (window.scrollY >= top) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed w-full z-50 transition ${
        scrolled
          ? "bg-black/80 backdrop-blur border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* LOGO */}
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          NPS
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button
            onClick={() => scrollToSection("home")}
            className={active === "home" ? "text-white" : "text-gray-400"}
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className={active === "services" ? "text-white" : "text-gray-400"}
          >
            Services
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={active === "contact" ? "text-white" : "text-gray-400"}
          >
            Contact
          </button>

          {/* ✅ RESULTS */}
          <button
            onClick={() => navigate("/transformations")}
            className="text-gray-400 hover:text-white"
          >
            Results
          </button>

          {/* CTA */}
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-white text-black rounded-xl"
          >
            Join Now
          </button>
        </nav>

        {/* MOBILE ICON */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-6 space-y-4 text-center">
          <button
            onClick={() => scrollToSection("home")}
            className="block w-full"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className="block w-full"
          >
            Services
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="block w-full"
          >
            Contact
          </button>

          {/* ✅ RESULTS MOBILE */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/transformations");
            }}
            className="block w-full"
          >
            Results
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            className="block w-full px-4 py-2 bg-white text-black rounded-xl"
          >
            Join Now
          </button>
        </div>
      )}
    </header>
  );
}
