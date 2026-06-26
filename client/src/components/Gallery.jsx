import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const getInstagramEmbedUrl = (url) => {
  if (url.includes("instagram.com/p/") || url.includes("instagram.com/reel/")) {
    // Strip query parameters and trailing slashes
    const baseUrl = url.split("?")[0].replace(/\/$/, "");
    return `${baseUrl}/embed`;
  }
  return null;
};

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(9);
        
        if (!error && data) {
          setPhotos(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);

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
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-12 md:py-20 px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-12">
        <div className="animate-on-scroll">
          <p className="section-tag">Gallery</p>
          <h2 className="section-heading">
            Inside The <span className="gradient-text">Studio</span>
          </h2>
          <p className="section-subheading">
            A glimpse into our private training sessions and community.
          </p>
          <div className="gold-line" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 relative z-10 stagger-children">
        {photos.map((photo) => {
          const igEmbedUrl = getInstagramEmbedUrl(photo.url);

          return (
            <div
              key={photo.id}
              className="animate-on-scroll aspect-square overflow-hidden rounded-xl bg-[#111] border border-[#1E1E1E] group relative"
            >
              {igEmbedUrl ? (
                <iframe
                  src={igEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  title="Instagram Embed"
                />
              ) : (
                <img
                  src={photo.url}
                  alt="Gallery Photo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400/111111/C9A34E?text=Photo+Unavailable";
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
