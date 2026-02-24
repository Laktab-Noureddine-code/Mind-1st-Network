import { motion } from "framer-motion";

const features = [
  {
    img: "/landing/feature-matching.png",
    title: "Academic Profiles",
    desc: "Create your student identity, listing your university, major, and technical skills.",
  },
  {
    img: "/landing/feature-events.png",
    title: "Academic Wiki",
    desc: "Write and manage detailed tutorials, lecture notes, or code snippets with our rich-text editor.",
  },
  {
    img: "/landing/feature-groups.png",
    title: "Study Modules & Pages",
    desc: "Create dedicated spaces for your courses, share resources, and broadcast to your peers.",
  },
  {
    img: "/landing/feature-matching.png",
    title: "Real-Time Support",
    desc: "Connect instantly with study partners or module groups via live WebSockets chat.",
  },
  {
    img: "/landing/feature-events.png",
    title: "Global Search",
    desc: "Find professors, fellow students, and academic wikis efficiently with smart search and tags.",
  },
  {
    img: "/landing/feature-groups.png",
    title: "Distraction-Free Feed",
    desc: "Stay focused with a curated stream of helpful academic content from the modules and peers you follow.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section id="service" className="py-24 px-4 md:px-0 bg-[#f5fafe]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
            Academic Features
          </h2>
          <p className="text-[#636E72] max-w-xl mx-auto">
            Explore advanced tools designed specifically for academic
            collaboration, knowledge sharing, and student focused growth.
          </p>
        </div>

        {/* Features Grid */}
        <div
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-400 cursor-pointer"
            >
              {/* Illustration */}
              <div className="w-full h-40 rounded-xl bg-[#eef7fc] flex items-center justify-center mb-5 overflow-hidden">
                <img
                  src={feat.img}
                  alt={feat.title}
                  className="h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#2D3436] mb-2 group-hover:text-[#5bb6ea] transition-colors">
                {feat.title}
              </h3>
              <p className="text-[#636E72] text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#5bb6ea] text-white font-semibold text-sm hover:bg-[#4a96c4] transition-all duration-300 hover:shadow-lg hover:shadow-[#5bb6ea]/25"
          >
            See All
          </a>
        </div>
      </div>
    </section>
  );
}
