import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    img: "/landing/feature-matching.png",
    title: "Setup Academic Profile",
    desc: "Create your student identity, listing your major, university, and technical skills.",
  },
  {
    num: "02",
    img: "/landing/feature-events.png",
    title: "Join Study Modules",
    desc: "Find dedicated groups and spaces aligned with your specific coursework and interests.",
  },
  {
    num: "03",
    img: "/landing/feature-groups.png",
    title: "Publish to Wiki",
    desc: "Write enriched lecture notes and code tutorials to share your academic insights.",
  },
  {
    num: "04",
    img: "/landing/hero-friends.png",
    title: "Engage & Collaborate",
    desc: "Message peers directly, join study group discussions, and curate your campus feed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="portfolio" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
            How It Works
          </h2>
          <p className="text-[#636E72] max-w-xl mx-auto">
            Your path to academic collaboration is simple. Follow these steps to
            start expanding your knowledge network.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.num} className="text-center group">
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
        <div className="text-center">
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
