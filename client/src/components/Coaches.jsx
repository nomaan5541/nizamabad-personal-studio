import { Instagram, Award, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

const coaches = [
  {
    name: "Coach Syed",
    role: "Head Trainer & Founder",
    specialties: ["Strength Training", "Bodybuilding", "Competition Prep"],
    instagram: "https://www.instagram.com/bemassive_with_syed",
    handle: "@bemassive_with_syed",
    gradient: "from-[#C9A34E]/20 via-transparent to-transparent",
  },
  {
    name: "Coach Fatima",
    role: "Fitness Coach",
    specialties: ["Fat Loss", "Women's Fitness", "Nutrition"],
    instagram: "https://www.instagram.com/bemassive_with_fatima",
    handle: "@bemassive_with_fatima",
    gradient: "from-rose-500/15 via-transparent to-transparent",
  },
  {
    name: "Coach Syed (Flow)",
    role: "Movement & Conditioning",
    specialties: ["Functional Training", "Mobility", "HIIT"],
    instagram: "https://www.instagram.com/syedin.flow",
    handle: "@syedin.flow",
    gradient: "from-blue-500/15 via-transparent to-transparent",
  },
];

export default function Coaches() {
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
      id="coaches"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[400px] h-[400px] top-[20%] left-[-100px] opacity-30" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-16">
        <div className="animate-on-scroll">
          <p className="section-tag">Our Team</p>
          <h2 className="section-heading">
            Meet Your <span className="gradient-text">Coaches</span>
          </h2>
          <p className="section-subheading">
            Expert trainers dedicated to your personal transformation journey.
            Every coach brings years of experience and genuine passion.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      {/* Coach Cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto relative z-10 stagger-children">
        {coaches.map((coach, i) => (
          <div
            key={coach.name}
            className="animate-on-scroll group relative rounded-3xl border border-[#1E1E1E] hover:border-[#C9A34E]/30 overflow-hidden transition-all duration-500"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Gradient BG */}
            <div className={`absolute inset-0 bg-gradient-to-b ${coach.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#C9A34E]/20 to-[#1A1A1A] border border-[#C9A34E]/20 flex items-center justify-center group-hover:scale-110 group-hover:border-[#C9A34E]/40 transition-all duration-500">
                <Award size={32} className="text-[#C9A34E]" />
              </div>

              {/* Info */}
              <h3
                className="text-xl font-bold text-center mb-1"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {coach.name}
              </h3>
              <p className="text-[#C9A34E] text-sm text-center mb-4">
                {coach.role}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {coach.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Instagram */}
              <a
                href={coach.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-[#C9A34E] transition-colors duration-300 group/link"
              >
                <Instagram size={16} />
                <span>{coach.handle}</span>
                <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Bottom glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#C9A34E]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        ))}
      </div>

      {/* Studio link */}
      <div className="animate-on-scroll text-center mt-12 relative z-10">
        <a
          href="https://www.instagram.com/bemassive_p.t_studio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#C9A34E] transition-colors duration-300"
        >
          <Instagram size={16} />
          Follow our studio @bemassive_p.t_studio
          <ExternalLink size={12} />
        </a>
      </div>
    </section>
  );
}
