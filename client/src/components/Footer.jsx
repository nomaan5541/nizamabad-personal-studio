import { Instagram, MapPin, Phone, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#1E1E1E] overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)" }}>
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[300px] h-[300px] bottom-[-100px] left-1/2 -translate-x-1/2 opacity-10" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
              <div>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  BEMASSIVE
                </h2>
                <p className="text-[#C9A34E] text-[10px] tracking-[3px] uppercase">P.T_STUDIO</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-3">
              Private elite training for strength, hypertrophy, and real transformation.
              Your journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {["Home", "Services", "Pricing", "Results", "Coaches", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 text-sm hover:text-[#C9A34E] transition-colors duration-300 gold-underline w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="text-[#C9A34E] shrink-0" />
                Malapally, Nizamabad
              </div>
              <a href="tel:+917396854458" className="flex items-center gap-2 text-gray-400 text-sm hover:text-[#C9A34E] transition-colors">
                <Phone size={14} className="text-[#C9A34E] shrink-0" />
                +91 7396854458
              </a>
              <a
                href="https://wa.me/917396854458"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 text-sm hover:text-green-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Follow Us
            </h3>
            <div className="space-y-3">
              {[
                { label: "Studio Page", handle: "@bemassive_p.t_studio", url: "https://www.instagram.com/bemassive_p.t_studio" },
                { label: "Coach Syed", handle: "@bemassive_with_syed", url: "https://www.instagram.com/bemassive_with_syed" },
                { label: "Coach Fatima", handle: "@bemassive_with_fatima", url: "https://www.instagram.com/bemassive_with_fatima" },
              ].map((s) => (
                <a
                  key={s.handle}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-[#C9A34E] transition-colors duration-300 group"
                >
                  <Instagram size={14} className="shrink-0" />
                  <span>{s.handle}</span>
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-[#1E1E1E] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} bemassive_p.t_studio. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-gray-600 text-xs">
            Made with <Heart size={12} className="text-red-400 fill-red-400 mx-0.5" /> in Nizamabad
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-[#111] border border-[#1E1E1E] hover:border-[#C9A34E]/40 flex items-center justify-center text-gray-400 hover:text-[#C9A34E] transition-all duration-300 hover:scale-110"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
