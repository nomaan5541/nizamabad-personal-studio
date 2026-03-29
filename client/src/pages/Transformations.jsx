import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
const API = import.meta.env.VITE_API_URL;

export default function Transformations() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get("${API}/api/transformations").then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  const next = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  if (!data.length) {
    return (
      <div id="results" className="text-white text-center py-12 text-lg">
        Loading transformations...
      </div>
    );
  }

  const item = data[index];

  return (
    <section
      id="results"
      className="py-12 md:py-16 px-4 flex flex-col items-center bg-black"
    >
      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-semibold text-center">
        Client Transformations
      </h1>

      <p className="text-gray-400 mt-3 text-center max-w-xl text-sm md:text-base">
        Real results from real clients who committed to the process.
      </p>

      {/* Slider */}
      <div className="relative w-full max-w-3xl mt-8">
        <div className="grid grid-cols-2 gap-2 bg-[#1A1A1A] p-2 rounded-xl border border-gray-800">
          {/* BEFORE */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={item.before}
              alt="before"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded">
              BEFORE
            </span>
          </div>

          {/* AFTER */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={item.after}
              alt="after"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-xs bg-[#C9A34E] text-black px-2 py-1 rounded">
              AFTER
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-4 bg-[#111] border border-gray-800 rounded-lg p-3 text-center">
          <p className="text-sm md:text-base font-medium">
            {item.title || "Transformation Result"}
          </p>

          <p className="text-gray-400 text-xs md:text-sm mt-1">
            {item.description ||
              "Consistent training and discipline led to this result."}
          </p>

          {/* <p className="text-[#C9A34E] text-xs mt-1">
            {item.duration || "12 Weeks Transformation"}
          </p> */}
        </div>

        {/* Buttons */}
        <button
          onClick={prev}
          className="absolute left-[-6px] md:left-[-14px] top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={next}
          className="absolute right-[-6px] md:right-[-14px] top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
