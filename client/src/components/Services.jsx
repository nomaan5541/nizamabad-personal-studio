import { Dumbbell, Flame, TrendingUp, Target, Zap, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

const services = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    desc: "Build real strength with structured and progressive training systems.",
    features: [
      "Personalized workout plans",
      "Form correction & coaching",
      "Strength progression tracking",
    ],
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Hypertrophy",
    desc: "Maximize muscle growth with scientifically structured programs.",
    features: [
      "Muscle-focused training splits",
      "Volume & intensity optimization",
      "Nutrition guidance",
    ],
    gradient: "from-[#C9A34E]/10 to-transparent",
  },
  {
    icon: Flame,
    title: "Fat Loss",
    desc: "Lose fat effectively while maintaining strength and muscle mass.",
    features: [
      "Custom diet planning",
      "Smart cardio integration",
      "Weekly progress tracking",
    ],
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    icon: Target,
    title: "Body Recomposition",
    desc: "Simultaneously lose fat and gain muscle with precision programming.",
    features: [
      "Calorie cycling strategies",
      "Macro-balanced meal plans",
      "Body composition analysis",
    ],
    gradient: "from-yellow-500/10 to-transparent",
  },
  {
    icon: Zap,
    title: "HIIT & Conditioning",
    desc: "High-intensity training for maximum calorie burn and endurance.",
    features: [
      "Circuit training sessions",
      "Metabolic conditioning",
      "Functional fitness drills",
    ],
    gradient: "from-red-500/10 to-transparent",
  },
  {
    icon: Heart,
    title: "Lifestyle Coaching",
    desc: "Holistic approach to transform your fitness habits and mindset.",
    features: [
      "Sleep optimization",
      "Stress management",
      "Sustainable habit building",
    ],
    gradient: "from-rose-500/10 to-transparent",
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  };

  return (
    <div
      ref={cardRef}
      className="animate-on-scroll group relative p-7 rounded-2xl bg-[#111] border border-[#1E1E1E] hover:border-[#C9A34E]/40 transition-all duration-500 cursor-pointer overflow-hidden"
      style={{ transitionDelay: `${index * 100}ms`, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-[#C9A34E]/10 border border-[#C9A34E]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#C9A34E]/20 transition-all duration-500">
          <service.icon className="text-[#C9A34E]" size={26} />
        </div>

        <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {service.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-5">
          {service.desc}
        </p>

        <ul className="space-y-2.5">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E] shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Hover glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C9A34E]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-on-scroll");
            elements.forEach((el) => el.classList.add("visible"));
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
      id="services"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Ambient orbs */}
      <div className="glow-orb glow-orb-gold w-[400px] h-[400px] top-[10%] right-[-100px]" />
      <div className="glow-orb glow-orb-white w-[300px] h-[300px] bottom-[20%] left-[-100px]" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-16">
        <div className="animate-on-scroll">
          <p className="section-tag">What We Offer</p>
          <h2 className="section-heading">
            Our Training <span className="gradient-text">Programs</span>
          </h2>
          <p className="section-subheading">
            Results-driven programs designed to transform your physique and performance.
            Every session is personalized to your goals.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto relative z-10 stagger-children">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
