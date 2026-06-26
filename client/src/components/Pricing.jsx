import { Check, ArrowRight, Crown, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const plans = [
  {
    name: "Basic",
    price: "6,499",
    period: "/month",
    icon: Zap,
    description: "Perfect for beginners starting their fitness journey",
    features: [
      "Personalized workout plans",
      "Form correction & coaching",
      "Access to studio equipment",
      "Monthly progress check-in",
      "WhatsApp support",
    ],
    popular: false,
    gradient: "from-gray-500/10 to-transparent",
    borderColor: "border-gray-700",
    hoverBorder: "hover:border-gray-500",
  },
  {
    name: "Pro",
    price: "8,999",
    period: "/month",
    icon: Star,
    description: "Most popular — for serious transformation seekers",
    features: [
      "Everything in Basic",
      "Custom nutrition guidance",
      "Weekly progress tracking",
      "Strength & body analysis",
      "Diet plan adjustments",
      "Priority scheduling",
    ],
    popular: true,
    gradient: "from-[#C9A34E]/15 to-transparent",
    borderColor: "border-[#C9A34E]/40",
    hoverBorder: "hover:border-[#C9A34E]",
  },
  {
    name: "Elite",
    price: "12,999",
    period: "/month",
    icon: Crown,
    description: "The ultimate private training experience",
    features: [
      "Everything in Pro",
      "Unlimited 1-on-1 sessions",
      "24/7 coach access",
      "Advanced body composition",
      "Competition preparation",
      "Supplement guidance",
      "Exclusive group sessions",
    ],
    popular: false,
    gradient: "from-amber-500/10 to-transparent",
    borderColor: "border-gray-700",
    hoverBorder: "hover:border-amber-500/50",
  },
];

function PricingCard({ plan, index }) {
  const navigate = useNavigate();

  return (
    <div
      className={`animate-on-scroll relative p-8 rounded-3xl border ${plan.borderColor} ${plan.hoverBorder} transition-all duration-500 overflow-hidden group ${
        plan.popular
          ? "bg-gradient-to-b from-[#C9A34E]/5 to-[#111] scale-[1.02] lg:scale-105"
          : "bg-[#111]"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="bg-[#C9A34E] text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon & name */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            plan.popular ? "bg-[#C9A34E]/20" : "bg-white/5"
          }`}>
            <plan.icon size={20} className={plan.popular ? "text-[#C9A34E]" : "text-gray-400"} />
          </div>
          <h3 className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {plan.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-[#C9A34E]">₹{plan.price}</span>
            <span className="text-gray-500 text-sm">{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
              <Check size={16} className="text-[#C9A34E] shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => navigate("/booking")}
          className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            plan.popular
              ? "btn-primary"
              : "border border-gray-700 hover:border-[#C9A34E]/40 hover:bg-[#C9A34E]/10 hover:text-[#C9A34E]"
          }`}
        >
          Get Started <ArrowRight size={16} />
        </button>
      </div>

      {/* Corner glow */}
      {plan.popular && (
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9A34E]/10 rounded-full blur-3xl" />
      )}
    </div>
  );
}

export default function Pricing() {
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
      id="pricing"
      ref={sectionRef}
      className="pt-20 pb-0 md:pt-28 md:pb-0 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a08 50%, #050505 100%)",
      }}
    >
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-16">
        <div className="animate-on-scroll">
          <p className="section-tag">Pricing Plans</p>
          <h2 className="section-heading">
            Invest In Your <span className="gradient-text">Transformation</span>
          </h2>
          <p className="section-subheading">
            Choose the plan that fits your goals. Every plan includes personalized
            attention from our expert coaches.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto relative z-10 stagger-children items-start">
        {plans.map((p, i) => (
          <PricingCard key={p.name} plan={p} index={i} />
        ))}
      </div>

      {/* Note */}
      <div className="animate-on-scroll text-center mt-12 relative z-10">
        <p className="text-gray-600 text-sm">
          All plans include access to our private studio. Prices are inclusive of GST.
          <br />
          Contact us for couple packages and group discounts.
        </p>
      </div>
    </section>
  );
}
