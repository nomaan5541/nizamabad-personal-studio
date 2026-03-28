import { Dumbbell, Flame, TrendingUp } from "lucide-react";

export default function Services() {
  return (
    <section
      id="services"
      className="py-14 md:py-20 px-4 bg-gradient-to-b from-[#0A0A0A] to-black"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold">
          Our Training Programs
        </h2>

        <p className="text-gray-400 mt-6 text-base md:text-lg">
          Results-driven programs designed to transform your physique and
          performance.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div className="group p-8 rounded-2xl bg-[#1A1A1A] border border-gray-800 hover:border-[#C9A34E]/50 transition duration-300 cursor-pointer hover:scale-[1.02]">
          <Dumbbell className="text-[#C9A34E] mb-5" size={34} />

          <h3 className="text-2xl font-semibold">Strength Training</h3>

          <p className="text-gray-400 mt-4 text-base">
            Build real strength with structured and progressive training
            systems.
          </p>

          <ul className="mt-5 text-sm text-gray-300 space-y-2">
            <li>✔ Personalized workout plans</li>
            <li>✔ Form correction & coaching</li>
            <li>✔ Strength progression tracking</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="group p-8 rounded-2xl bg-[#1A1A1A] border border-gray-800 hover:border-[#C9A34E]/50 transition duration-300 cursor-pointer hover:scale-[1.02]">
          <TrendingUp className="text-[#C9A34E] mb-5" size={34} />

          <h3 className="text-2xl font-semibold">Hypertrophy</h3>

          <p className="text-gray-400 mt-4 text-base">
            Maximize muscle growth with scientifically structured programs.
          </p>

          <ul className="mt-5 text-sm text-gray-300 space-y-2">
            <li>✔ Muscle-focused training splits</li>
            <li>✔ Volume & intensity optimization</li>
            <li>✔ Nutrition guidance</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="group p-8 rounded-2xl bg-[#1A1A1A] border border-gray-800 hover:border-[#C9A34E]/50 transition duration-300 cursor-pointer hover:scale-[1.02]">
          <Flame className="text-[#C9A34E] mb-5" size={34} />

          <h3 className="text-2xl font-semibold">Fat Loss</h3>

          <p className="text-gray-400 mt-4 text-base">
            Lose fat effectively while maintaining strength and muscle mass.
          </p>

          <ul className="mt-5 text-sm text-gray-300 space-y-2">
            <li>✔ Custom diet planning</li>
            <li>✔ Smart cardio integration</li>
            <li>✔ Weekly progress tracking</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
