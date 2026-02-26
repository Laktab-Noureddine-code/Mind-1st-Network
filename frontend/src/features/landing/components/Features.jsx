import { motion } from "framer-motion";
import {
  Search,
  CalendarDays,
  Users,
  MessageCircle,
  TrendingUp,
  MapPin,
} from "lucide-react";

const helpCards = [
  {
    icon: "/landing/profiles.svg",
    title: "Academic Profiles",
    desc: "Showcase your university, major, and growing technical skills.",
    color: "text-[#5bb6ea]",
    bg: "bg-[#5bb6ea]/10",
  },
  {
    icon: "/landing/modules.svg",
    title: "Study Modules",
    desc: "Join course-focused groups to access shared resources and announcements.",
  },
  {
    icon: "/landing/academic.svg",
    title: "Academic Wiki",
    desc: "Publish long-form tutorials, code snippets, and structured lecture notes.",
  },
  {
    icon: "/landing/support.svg",
    title: "Real-Time Support",
    desc: "Get instant study help via 1-on-1 and study module chat rooms.",
  },
  {
    icon: "/landing/feed.svg",
    title: "Distraction-Free Feed",
    desc: "A strictly curated stream from your modules, peers, and academic pages.",
  },
  {
    icon: "/landing/discover.svg",
    title: "Global Discovery",
    desc: "Explore tags, students, and professors to expand your academic insights.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section id="about" className="py-20 px-4 bg-[#eef7fc]">
      <div className="max-w-7xl mx-auto bg-[#fcfcfc] rounded-2xl shadow-lg p-14">
        <div className="items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Platform
              <span className="block text-[#5bb6ea]">Pillars</span>
            </h2>
            <p className="text-[#636E72] mb-8 text-lg">
              Our platform connects students with shared goals, academic
              modules, and the resources to succeed.
            </p>

            {/* Icon Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {helpCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className="bg-white cursor-pointer rounded-2xl border hover:border-[#9fdcff] p-4 shadow-sm group relative overflow-hidden z-0"
                >
                  <div className="absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#5bb6ea] group-hover:scale-[800%] duration-500 z-[-1]"></div>

                  <div className="inline-flex p-2.5 rounded-xl mb-3 bg-transparent group-hover:bg-white transition-colors duration-500">
                    <img
                      src={card.icon}
                      alt={card.title}
                      loading="lazy"
                      width="48"
                      height="48"
                      className="w-12 h-12 relative z-10"
                    />
                  </div>
                  <h3 className="font-semibold text-[#2D3436] text-lg mb-1 duration-500">
                    {card.title}
                  </h3>
                  <p className="text-[#3b4042] text-sm leading-relaxed duration-500">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
