import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const getInstagramEmbedUrl = (url) => {
  if (url.includes("instagram.com/p/") || url.includes("instagram.com/reel/")) {
    const baseUrl = url.split("?")[0].replace(/\/$/, "");
    return `${baseUrl}/embed`;
  }
  return null;
};

export default function GalleryPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (!error && data) {
          setPhotos(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Ambient */}
      <div className="glow-orb glow-orb-gold w-[500px] h-[500px] top-[-200px] right-[-200px] opacity-20" />

      <div className="max-w-7xl mx-auto px-5 py-10 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <p className="section-tag">Public Gallery</p>
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Studio <span className="gradient-text">Moments</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            A closer look into our private training sessions, transformations, and the community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse-glow w-12 h-12 rounded-full bg-[#C9A34E]/20 border border-[#C9A34E]/30" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p>No photos have been uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => {
              const igEmbedUrl = getInstagramEmbedUrl(photo.url);

              return (
                <div
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-xl bg-[#111] border border-[#1E1E1E] group relative"
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
        )}
      </div>
    </div>
  );
}
