import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-black"
    >
      <h1 className="text-3xl md:text-5xl font-bold leading-tight">
        Nizamabad Personal Studio
      </h1>

      <p className="mt-4 text-gray-400 max-w-xl">
        Private training for strength, hypertrophy and transformation.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
      >
        Join Now
      </button>
      <a
        href="https://wa.me/7416225041"
        target="_blank"
        className="mt-4 inline-block px-6 py-3 border border-green-500 text-green-400 rounded-xl"
      >
        Chat on WhatsApp
      </a>
    </section>
  );
}
