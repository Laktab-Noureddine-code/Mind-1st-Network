import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    img: "/landing/feature-matching.png",
    title: "Setup Your Profile",
    desc: "Create your professional identity, list your skills, and let others discover your expertise.",
  },
  {
    num: "02",
    img: "/landing/feature-events.png",
    title: "Join or Create Spaces",
    desc: "Discover engaging groups and pages, or build your own community around specific topics.",
  },
  {
    num: "03",
    img: "/landing/feature-groups.png",
    title: "Share Your Knowledge",
    desc: "Write enriched articles with our robust editor to establish your professional presence.",
  },
  {
    num: "04",
    img: "/landing/hero-friends.png",
    title: "Build Connections",
    desc: "Message directly, participate in discussions, and expand your professional network.",
  },
];

export default function HowItWorks() {
  return (
    <section id="portfolio" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
            Portfolio
          </h2>
          <p className="text-[#636E72] max-w-xl mx-auto">
            Getting started is simple. Follow these easy steps to start making
            meaningful connections.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="text-center group"
            >
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#5bb6ea] text-white font-bold text-sm mb-5">
                {step.num}
              </div>

              {/* Illustration */}
              <div className="w-full h-36 rounded-2xl bg-[#eef7fc] flex items-center justify-center mb-5 overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#2D3436] mb-2 text-base">
                {step.title}
              </h3>
              <p className="text-[#636E72] text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div
          className="text-center"
        >
          <a
            href="#testimonials"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#5bb6ea] text-white font-semibold text-sm hover:bg-[#4a96c4] transition-all duration-300 hover:shadow-lg hover:shadow-[#5bb6ea]/25"
          >
            Start networking
          </a>
        </div>
      </div>
    </section>
  );
}
