import { useEffect, useRef, useState } from "react";
import { Users, Trophy, Clock, Star } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Members Trained" },
  { icon: Trophy, value: 5, suffix: "+", label: "Years Experience" },
  { icon: Clock, value: 4, suffix: "", label: "Expert Coaches" },
  { icon: Star, value: 98, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({ target, suffix, duration = 2000, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    let animationId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [inView, target, duration]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          const els = entry.target.querySelectorAll(".animate-on-scroll");
          els.forEach((el) => el.classList.add("visible"));
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0d0b06 50%, #050505 100%)",
      }}
    >
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[600px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-on-scroll text-center group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C9A34E]/20 transition-all duration-500">
                <stat.icon size={28} className="text-[#C9A34E]" />
              </div>

              {/* Number */}
              <h3
                className="text-4xl md:text-5xl font-black gradient-text mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </h3>

              {/* Label */}
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider mt-20" />
    </section>
  );
}
