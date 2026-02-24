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
    icon: <Search size={22} />,
    title: "Academic Profiles",
    desc: "Showcase your university, major, and growing technical skills.",
    color: "text-[#5bb6ea]",
    bg: "bg-[#5bb6ea]/10",
  },
  {
    icon: <CalendarDays size={22} />,
    title: "Study Modules",
    desc: "Join course-focused groups to access shared resources and announcements.",
    color: "text-[#E17055]",
    bg: "bg-[#E17055]/10",
  },
  {
    icon: <Users size={22} />,
    title: "Academic Wiki",
    desc: "Publish long-form tutorials, code snippets, and structured lecture notes.",
    color: "text-[#6C5CE7]",
    bg: "bg-[#6C5CE7]/10",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "Real-Time Support",
    desc: "Get instant study help via 1-on-1 and study module chat rooms.",
    color: "text-[#00B894]",
    bg: "bg-[#00B894]/10",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Distraction-Free Feed",
    desc: "A strictly curated stream from your modules, peers, and academic pages.",
    color: "text-[#FDCB6E]",
    bg: "bg-[#FDCB6E]/20",
  },
  {
    icon: <MapPin size={22} />,
    title: "Global Discovery",
    desc: "Explore tags, students, and professors to expand your academic insights.",
    color: "text-[#E84393]",
    bg: "bg-[#E84393]/10",
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

export default function HelpSection() {
  return (
    <section id="about" className="py-20 px-4 bg-[#eef7fc]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Illustration */}
          <div className="flex justify-center">
            <img
              src="/landing/hero-friends.png"
              alt="Friends connecting"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Right - Content */}
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
            <div
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {helpCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className={`inline-flex p-2.5 rounded-xl ${card.bg} mb-3`}
                  >
                    <div className={card.color}>{card.icon}</div>
                  </div>
                  <h4 className="font-semibold text-[#2D3436] text-sm mb-1 group-hover:text-[#5bb6ea] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[#636E72] text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
