import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Dumbbell } from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "results", label: "Results" },
  { id: "coaches", label: "Coaches" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (location.pathname === "/") {
        const sections = NAV_LINKS.map((l) => l.id);
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150) {
              setActive(sections[i]);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection("home")}
        >
          <div className="relative">
            <img
              src="/logo.png"
              alt="bemassive_p.t_studio"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#C9A34E]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-white font-bold tracking-wide text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              BEMASSIVE
            </span>
            <span className="text-[#C9A34E] text-[10px] tracking-[3px] uppercase">
              P.T_STUDIO
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                active === link.id
                  ? "text-[#C9A34E]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
              {active === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#C9A34E] rounded-full" />
              )}
            </button>
          ))}

          <button
            onClick={() => navigate("/booking")}
            className="ml-4 btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
          >
            <Dumbbell size={16} />
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong border-t border-white/5 px-6 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === link.id
                  ? "text-[#C9A34E] bg-[#C9A34E]/10"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/booking");
              }}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              <Dumbbell size={16} />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
