export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-gray-800 px-6 py-10">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center md:text-left">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Nizamabad PT Studio
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Private elite training for strength, hypertrophy, and real
            transformation.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-medium mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <a href="#home" className="hover:text-white">
              Home
            </a>
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#results" className="hover:text-white">
              Results
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-medium mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">Malapally, Nizamabad</p>

          <a
            href="https://wa.me/7396854458"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-green-400 text-sm hover:underline"
          >
            WhatsApp Chat
          </a>
        </div>
      </div>

      {/* 🔥 BOTTOM */}
      <div className="mt-10 text-center text-gray-500 text-xs border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Nizamabad PT Studio. All rights reserved.
      </div>
    </footer>
  );
}
