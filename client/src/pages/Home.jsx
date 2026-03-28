import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Header />
      <Hero />
      <Services />
      <Contact />
    </div>
  );
}
