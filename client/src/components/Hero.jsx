import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-[85vh] md:min-h-screen flex flex-col justify-center items-center text-center px-5 overflow-hidden bg-gradient-to-b from-black via-[#0A0A0A] to-black"
    >
      {/* 🔥 MAIN GOLD GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-[#C9A34E]/10 rounded-full blur-3xl"></div>

      {/* 🔥 SIDE LIGHTS */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-gray-500/10 blur-3xl"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl">
        {/* 🔹 SMALL TAG */}
        <p className="text-[11px] md:text-xs tracking-[3px] text-gray-500 uppercase mb-5">
          Nizamabad PT Studio • Private Coaching
        </p>

        {/* 🔥 MAIN HEADLINE */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          Build Strength.
          <br />
          <span className="text-[#C9A34E]">Look Elite.</span>
        </h1>

        {/* 🔥 POWER LINE */}
        <p className="mt-5 text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
          Not a crowded gym. Not random workouts.
          <br className="hidden md:block" />
          <span className="text-white font-medium">
            Personal training focused on real transformation.
          </span>
        </p>

        {/* 🔥 DETAILS */}
        <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl">
          Strength • Hypertrophy • Fat Loss Guided by expert coaches in a
          private elite environment.
        </p>

        {/* 🔥 CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* PRIMARY */}
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C9A34E] text-black font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Start Now <ArrowRight size={18} />
          </button>

          {/* SECONDARY */}
          <a
            href="https://wa.me/7396854458"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-8 py-3 rounded-xl border border-green-500 text-green-400 hover:bg-green-500/10 transition duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* 🔥 TRUST */}
        <p className="mt-8 text-xs text-gray-500">
          Real clients. Real results. No shortcuts.
        </p>
      </div>
    </section>
  );
}
