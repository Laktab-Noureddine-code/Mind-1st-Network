import { Link } from "react-router-dom";

const steps = [
  {
    num: "1",
    img: "/landing/features/setup.svg",
    title: "Setup Academic Profile",
    desc: "Create your student identity, listing your major, university, and technical skills.",
  },
  {
    num: "2",
    img: "/landing/features/groups.svg",
    title: "Join Study Modules",
    desc: "Find dedicated groups and spaces aligned with your specific coursework and interests.",
  },
  {
    num: "3",
    img: "/landing/features/wiki.svg",
    title: "Publish to Wiki",
    desc: "Write enriched lecture notes and code tutorials to share your academic insights.",
  },
  {
    num: "4",
    img: "/landing/features/collaborate.svg",
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
          <div className="flex items-center justify-center">
            <img src="/landing/work.svg" alt="plan" className="h-20 w-20" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
              How It Works
            </h2>
          </div>
          <p className="text-[#636E72] max-w-xl mx-auto">
            Your path to academic collaboration is simple. Follow these steps to
            start expanding your knowledge network.
          </p>
        </div>

        {/* Steps List */}
        <div className="max-w-5xl mx-auto mb-12 relative flex flex-col gap-12 md:gap-17">
          {/* Timeline connecting lines svg (desktop only) */}
          <div className="absolute inset-x-0 inset-y-24 hidden md:block pointer-events-none z-0">
            <svg
              className="w-full h-[calc(100%-8rem)] text-[#5bb6ea]/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="8 8"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {/* Path mapping: Start top right, wind left, wind right, wind left */}
              <path
                d="M 65 5 
                   L 65 15 
                   C 65 20, 60 25, 55 25 
                   L 40 25 
                   C 35 25, 30 30, 30 35 
                   L 30 50
                   C 30 55, 35 60, 40 60
                   L 55 60
                   C 60 60, 65 65, 65 70
                   L 65 85
                   C 65 90, 60 95, 55 95
                   L 40 95"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.num}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-left bg-white p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <img
                        src={`/landing/steps/${step.num}.svg`}
                        alt=""
                        loading="lazy"
                        width="80"
                        height="80"
                        className="w-16 h-16 md:w-20 md:h-20"
                      />
                    </div>
                    <h3 className="font-bold text-[#2D3436] text-xl md:text-2xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#636E72] text-base md:text-lg leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>

                {/* Illustration */}
                <div className="w-full md:w-1/2 relative bg-white py-4">
                  <div className="w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="lazy"
                      width="500"
                      height="320"
                      className="w-full h-64 md:h-80 object-contain relative z-10"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA button */}
        <div className="text-center">
          <Link
            to="/register"
            className="my-btn inline-flex items-center justify-center px-8 py-3 bg-[#5bb6ea] text-white font-semibold text-sm hover:bg-[#4a96c4] transition-all duration-300 hover:shadow-lg hover:shadow-[#5bb6ea]/25"
          >
            Start networking
          </Link>
        </div>
      </div>
    </section>
  );
}
