import { MapPin, Phone, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-12 md:py-16 px-4 bg-gradient-to-b from-black to-[#0A0A0A]"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold">Visit Our Studio</h2>

        <p className="text-gray-400 mt-4 text-base md:text-lg">
          Nizamabad PT Studio — Private Elite Training Studio
        </p>
      </div>

      {/* Main */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="space-y-5">
          <div className="card flex items-start gap-4">
            <MapPin className="text-[#C9A34E]" />
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-400 text-sm mt-1">Malapally, Nizamabad</p>
            </div>
          </div>

          <div className="card flex items-start gap-4">
            <Phone className="text-[#C9A34E]" />
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="text-gray-400 text-sm mt-1">+91 7396854458</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold">Opening Hours</h3>
            <p className="text-gray-400 text-sm mt-2">6:00 AM – 10:00 PM</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="https://wa.me/917396854458"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Chat on WhatsApp
            </a>

            <a href="tel:+917396854458" className="btn-secondary text-center">
              Call Now
            </a>
          </div>
        </div>

        {/* RIGHT - FIXED MAP */}
        <div className="relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden border border-gray-800">
          {/* iframe (disabled interaction layer below will control UX) */}
          <iframe
            title="gym-location"
            src="https://maps.google.com/maps?q=Malapally%20Nizamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            loading="lazy"
          ></iframe>

          {/* 🔥 MOBILE FIX OVERLAY */}
          <a
            href="https://www.google.com/maps?q=Malapally%20Nizamabad"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium md:hidden"
          >
            Tap to open in Google Maps
          </a>
        </div>
      </div>

      {/* COACHES */}
      <div className="mt-14 max-w-6xl mx-auto">
        <h3 className="text-xl md:text-3xl font-semibold text-center">
          Meet Our Coaches
        </h3>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {/* Studio */}
          <a
            href="https://www.instagram.com/bemassive_nzb_p.tstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:scale-[1.02] transition"
          >
            <Instagram className="text-[#C9A34E]" />
            <div>
              <p className="font-semibold">Studio Page</p>
              <p className="text-gray-400 text-sm">@bemassive_nzb_p.tstudio</p>
            </div>
          </a>

          {/* Syed */}
          <a
            href="https://www.instagram.com/bemassive_with_syed"
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:scale-[1.02] transition"
          >
            <Instagram className="text-[#C9A34E]" />
            <div>
              <p className="font-semibold">Coach Syed</p>
              <p className="text-gray-400 text-sm">@bemassive_with_syed</p>
            </div>
          </a>

          {/* Fatima */}
          <a
            href="https://www.instagram.com/bemassive_with_fatima"
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:scale-[1.02] transition"
          >
            <Instagram className="text-[#C9A34E]" />
            <div>
              <p className="font-semibold">Coach Fatima</p>
              <p className="text-gray-400 text-sm">@bemassive_with_fatima</p>
            </div>
          </a>

          {/* Flow */}
          <a
            href="https://www.instagram.com/syedin.flow"
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:scale-[1.02] transition"
          >
            <Instagram className="text-[#C9A34E]" />
            <div>
              <p className="font-semibold">Coach Syed (Flow)</p>
              <p className="text-gray-400 text-sm">@syedin.flow</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
