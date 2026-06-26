import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Rahul K.",
    text: "Lost 15kg in 4 months! The coaches here truly care about your progress. Best decision I ever made.",
    rating: 5,
  },
  {
    name: "Priya M.",
    text: "As a woman, I was hesitant to join a gym. But Nizamabad PT Studio's private training made me feel so comfortable. Amazing results!",
    rating: 5,
  },
  {
    name: "Ahmed S.",
    text: "Gained 8kg of lean muscle mass. The personalized nutrition plan and progressive overload programming really works.",
    rating: 5,
  },
  {
    name: "Sneha R.",
    text: "Coach Fatima changed my entire perspective on fitness. Down 2 dress sizes and feeling stronger than ever!",
    rating: 5,
  },
  {
    name: "Vikram J.",
    text: "The one-on-one attention you get here is unmatched. No crowded gym chaos, just pure focused training.",
    rating: 5,
  },
  {
    name: "Meera D.",
    text: "My back pain is gone after 3 months of corrective training. The coaches really know their anatomy.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <div className="shrink-0 w-[340px] p-6 rounded-2xl bg-[#111] border border-[#1E1E1E] hover:border-[#C9A34E]/30 transition-all duration-500 mx-3 group">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-[#C9A34E] fill-[#C9A34E]"
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed mb-5">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A34E]/30 to-[#1A1A1A] border border-[#C9A34E]/20 flex items-center justify-center">
          <span className="text-[#C9A34E] font-bold text-sm">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-white font-medium text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">Verified Member</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-12 px-5">
        <div className="animate-on-scroll">
          <p className="section-tag">Testimonials</p>
          <h2 className="section-heading">
            What Our <span className="gradient-text">Members</span> Say
          </h2>
          <p className="section-subheading">
            Real stories from real people who transformed their lives with us.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex animate-marquee mb-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </div>

        {/* Row 2 (reverse) */}
        <div
          className="flex"
          style={{
            animation: "marquee 40s linear infinite reverse",
          }}
        >
          {[...testimonials.reverse(), ...testimonials].map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
