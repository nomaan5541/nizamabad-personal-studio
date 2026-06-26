import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Gold particle canvas background
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.growing = Math.random() > 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.6) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.05) this.growing = true;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 163, 78, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

// Animated text reveal
function AnimatedText({ text, className, delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block transition-all duration-1000 ${className} ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {text}
    </span>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1a140a 0%, #050505 50%, #000000 100%)",
      }}
    >
      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Ambient Glow Orbs */}
      <div className="glow-orb glow-orb-gold w-[600px] h-[600px] top-[-200px] left-1/2 -translate-x-1/2 animate-pulse-glow" />
      <div className="glow-orb glow-orb-white w-[300px] h-[300px] top-[10%] left-[5%]" />
      <div className="glow-orb glow-orb-gold w-[250px] h-[250px] bottom-[10%] right-[5%] opacity-50" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl">
        {/* Tag */}
        <div
          className={`flex items-center gap-2 mb-8 transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Sparkles size={14} className="text-[#C9A34E]" />
          <p className="section-tag mb-0">
            bemassive_p.t_studio • Private Coaching
          </p>
          <Sparkles size={14} className="text-[#C9A34E]" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <AnimatedText text="Build Strength." className="block" delay={400} />
          <AnimatedText
            text="Look Elite."
            className="block gradient-text mt-2"
            delay={700}
          />
        </h1>

        {/* Subheadline */}
        <div
          className={`mt-8 transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Not a crowded gym. Not random workouts.
            <br className="hidden md:block" />
            <span className="text-white font-semibold">
              Personal training focused on real transformation.
            </span>
          </p>
        </div>

        {/* Details */}
        <div
          className={`mt-4 transition-all duration-1000 delay-[1200ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm md:text-base text-gray-500 max-w-xl flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E]" />
              Strength
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E]" />
              Hypertrophy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E]" />
              Fat Loss
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Guided by expert coaches in a private elite environment.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-1000 delay-[1400ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => navigate("/booking")}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-base px-10 py-4 rounded-2xl"
          >
            Start Your Journey <ArrowRight size={18} />
          </button>

          <a
            href="https://wa.me/917396854458"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-10 py-4 rounded-2xl border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust */}
        <div
          className={`mt-12 transition-all duration-1000 delay-[1600ms] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <span className="text-[#C9A34E]">★★★★★</span> 5.0 Rating
            </span>
            <span className="w-px h-3 bg-gray-700" />
            <span>Real clients. Real results.</span>
            <span className="w-px h-3 bg-gray-700 hidden sm:block" />
            <span className="hidden sm:block">No shortcuts.</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[2000ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#C9A34E] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
