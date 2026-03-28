import Hero from "../components/Hero";
import Services from "../components/Services";
import Transformations from "./Transformations"; // 👈 ADD THIS
import Contact from "../components/Contact";
import Footer from "../components/Footer"; // 👈 ADD FOOTER

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Services />
      <Transformations /> {/* 🔥 SCROLL RESULTS */}
      <Contact />
      <Footer />
    </div>
  );
}
