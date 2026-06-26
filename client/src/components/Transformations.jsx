import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { supabase } from "../lib/supabase";

// Placeholder transformations for demo (when Supabase isn't configured)
const placeholderData = [
  {
    id: 1,
    before_url: "",
    after_url: "",
    title: "12 Week Transformation",
    description: "Lost 15kg through disciplined training and nutrition. Consistent effort led to amazing results.",
  },
  {
    id: 2,
    before_url: "",
    after_url: "",
    title: "6 Month Journey",
    description: "Gained 10kg of lean muscle mass with progressive overload and proper diet planning.",
  },
  {
    id: 3,
    before_url: "",
    after_url: "",
    title: "Body Recomposition",
    description: "Complete body transformation — fat loss and muscle gain achieved simultaneously.",
  },
];

export default function Transformations() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const { data: transformations, error } = await supabase
          .from("transformations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error || !transformations?.length) {
          setData(placeholderData);
        } else {
          setData(transformations);
        }
      } catch {
        setData(placeholderData);
      }
    };

    fetchTransformations();
  }, []);

  useEffect(() => {
    if (!data.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

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

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));

  if (!data.length) {
    return (
      <div id="results" className="text-white text-center py-20 text-lg">
        <div className="animate-shimmer h-64 w-full max-w-3xl mx-auto rounded-2xl" />
      </div>
    );
  }

  const item = data[index];
  const beforeUrl = item.before_url || item.before;
  const afterUrl = item.after_url || item.after;

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-[30%] right-[-150px] opacity-20" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-12">
        <div className="animate-on-scroll">
          <p className="section-tag">Real Results</p>
          <h2 className="section-heading">
            Client <span className="gradient-text">Transformations</span>
          </h2>
          <p className="section-subheading">
            Real results from real clients who committed to the process.
            Every transformation tells a story of discipline and dedication.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      {/* Slider */}
      <div className="animate-on-scroll relative w-full max-w-4xl mx-auto z-10">
        <div className="grid grid-cols-2 gap-3 bg-[#111] p-3 rounded-3xl border border-[#1E1E1E] shadow-2xl">
          {/* Before */}
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer group"
            onClick={() => beforeUrl && setLightbox(beforeUrl)}
          >
            {beforeUrl ? (
              <img
                src={beforeUrl}
                alt="Before transformation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Before</span>
              </div>
            )}
            <span className="absolute bottom-3 left-3 text-xs bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium border border-white/10">
              BEFORE
            </span>
          </div>

          {/* After */}
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer group"
            onClick={() => afterUrl && setLightbox(afterUrl)}
          >
            {afterUrl ? (
              <img
                src={afterUrl}
                alt="After transformation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1408] to-[#111] flex items-center justify-center">
                <span className="text-[#C9A34E] text-sm">After</span>
              </div>
            )}
            <span className="absolute bottom-3 left-3 text-xs bg-[#C9A34E] text-black px-3 py-1.5 rounded-lg font-semibold">
              AFTER
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-5 bg-[#111] border border-[#1E1E1E] rounded-2xl p-5 text-center">
          <p className="text-base md:text-lg font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {item.title || "Transformation Result"}
          </p>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
            {item.description || "Consistent training and discipline led to this result."}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-[#C9A34E] w-6" : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Nav Arrows */}
        <button
          onClick={prev}
          className="absolute left-[-8px] md:left-[-20px] top-[40%] -translate-y-1/2 bg-[#111] border border-[#1E1E1E] hover:border-[#C9A34E]/40 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={next}
          className="absolute right-[-8px] md:right-[-20px] top-[40%] -translate-y-1/2 bg-[#111] border border-[#1E1E1E] hover:border-[#C9A34E]/40 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#C9A34E] transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt="Transformation"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
