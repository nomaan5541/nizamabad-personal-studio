import { useEffect, useState } from "react";
import axios from "axios";

export default function Transformations() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  // fetch data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transformations")
      .then((res) => setData(res.data));
  }, []);

  // auto slide
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
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const item = data[index];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl mb-6">Transformations</h1>

      <div className="relative w-full max-w-3xl">
        {/* Images */}
        <div className="grid grid-cols-2 gap-2 bg-gray-900 p-4 rounded-xl">
          <img
            src={item.before}
            className="rounded-xl object-cover h-64 w-full"
          />
          <img
            src={item.after}
            className="rounded-xl object-cover h-64 w-full"
          />
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-center mt-4 text-gray-400">{item.description}</p>
        )}

        {/* Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded-full"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
