import Hero from "../components/Hero";
import Services from "../components/Services";
import Stats from "../components/Stats";
import Pricing from "../components/Pricing";
import Transformations from "../components/Transformations";
import Testimonials from "../components/Testimonials";
import Coaches from "../components/Coaches";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#050505] text-white grain-overlay">
      <Hero />
      <Stats />
      <Services />
      <Pricing />
      <Transformations />
      <Testimonials />
      <Coaches />
      <Contact />
      <Footer />
    </div>
  );
}
