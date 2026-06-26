import { MapPin, Phone, Clock, Instagram, ExternalLink, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".animate-on-scroll");
            els.forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[400px] h-[400px] bottom-[10%] right-[-100px] opacity-20" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-16">
        <div className="animate-on-scroll">
          <p className="section-tag">Get In Touch</p>
          <h2 className="section-heading">
            Visit Our <span className="gradient-text">Studio</span>
          </h2>
          <p className="section-subheading">
            Nizamabad PT Studio — Private Elite Training Studio.
            Walk in or reach out anytime.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 relative z-10">
        {/* Left - Info */}
        <div className="space-y-5 stagger-children">
          {/* Location */}
          <div className="animate-on-scroll card flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="text-[#C9A34E]" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Location</h3>
              <p className="text-gray-400 text-sm mt-1">Malapally, Nizamabad</p>
              <p className="text-gray-500 text-xs mt-0.5">Telangana, India</p>
            </div>
          </div>

          {/* Phone */}
          <div className="animate-on-scroll card flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Phone className="text-[#C9A34E]" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact</h3>
              <a href="tel:+917396854458" className="text-gray-400 text-sm mt-1 hover:text-[#C9A34E] transition-colors">
                +91 7396854458
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="animate-on-scroll card flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Clock className="text-[#C9A34E]" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Opening Hours</h3>
              <p className="text-gray-400 text-sm mt-1">6:00 AM – 10:00 PM</p>
              <p className="text-gray-500 text-xs mt-0.5">Monday - Saturday</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-on-scroll flex flex-col sm:flex-row gap-3 pt-3">
            <a
              href="https://wa.me/917396854458"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            <a
              href="tel:+917396854458"
              className="flex-1 btn-secondary text-center text-sm flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>

        {/* Right - Map */}
        <div className="animate-on-scroll from-right">
          <div className="relative w-full h-[350px] md:h-[460px] rounded-3xl overflow-hidden border border-[#1E1E1E] shadow-2xl group">
            <iframe
              title="gym-location"
              src="https://maps.google.com/maps?q=Malapally%20Nizamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />

            {/* Mobile overlay */}
            <a
              href="https://www.google.com/maps?q=Malapally%20Nizamabad"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium md:hidden backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-xl border border-white/20">
                <MapPin size={16} />
                Open in Google Maps
              </span>
            </a>

            {/* Corner badge */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 flex items-center gap-1.5">
              <MapPin size={12} className="text-[#C9A34E]" />
              Malapally, Nizamabad
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
