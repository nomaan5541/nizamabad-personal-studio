export default function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-10">Our Services</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 bg-black rounded-2xl">
          <h3 className="text-xl font-semibold">Strength Training</h3>
          <p className="text-gray-400 mt-2">
            Build raw power with expert guidance.
          </p>
        </div>

        <div className="p-6 bg-black rounded-2xl">
          <h3 className="text-xl font-semibold">Hypertrophy</h3>
          <p className="text-gray-400 mt-2">Focused muscle growth programs.</p>
        </div>

        <div className="p-6 bg-black rounded-2xl">
          <h3 className="text-xl font-semibold">Fat Loss</h3>
          <p className="text-gray-400 mt-2">
            Transform your body with structured plans.
          </p>
        </div>
      </div>
    </section>
  );
}
