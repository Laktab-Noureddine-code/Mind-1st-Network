import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-10 pt-24 pb-20">
        {/* Circles */}

        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/landing/circle1.svg"
            loading="lazy"
            alt=""
            className="absolute top-12 left-12 w-12 opacity-40"
          />
          <img
            src="/landing/circle2.svg"
            loading="lazy"
            alt=""
            className="absolute top-1/4 right-24 w-8 opacity-30"
          />
          <img
            src="/landing/circle3.svg"
            loading="lazy"
            alt=""
            className="absolute bottom-1/4 left-10 w-10 opacity-20"
          />
          <img
            src="/landing/circle1.svg"
            loading="lazy"
            alt=""
            className="absolute top-1/2 right-8 w-6 opacity-50"
          />
          <img
            src="/landing/circle2.svg"
            loading="lazy"
            alt=""
            className="absolute bottom-32 right-1/3 w-12 opacity-25"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Hero Illustration */}
          <div className="relative flex justify-center order-2 lg:order-1 mt-10 lg:mt-0">
            <video
              src="/landing/hero.webm"
              title="Professional Social Network Illustration"
              muted
              loop
              autoPlay
              playsInline
              width="800"
              height="600"
              fetchpriority="high"
              className="w-full h-auto max-w-none object-contain relative z-20 scale-110 md:scale-125 origin-center"
            />
          </div>

          {/* Right Content - Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-app-primary leading-tight mb-4 drop-shadow-sm">
              Academic
              <span className="block text-secondary font-black tracking-tight mt-1">
                LEARNING NETWORK
              </span>
            </h1>
            <p className="text-secondary/80 text-sm md:text-base mb-8 max-w-lg mx-auto lg:mx-0 font-medium">
              A distraction-free academic platform built to foster student
              success. Create your academic profile, join study modules, and
              collaborate through our rich-text Academic Wiki.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="my-btn bg-secondary text-white font-semibold shadow-lg hover:bg-secondary/80 hover:-translate-y-0.5 transition-all"
              >
                Join Us
              </Link>
              <Link
                to="#service"
                className="my-btn bg-app-primary text-white font-semibold shadow-lg hover:bg-app-primary/80 hover:-translate-y-0.5 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f5fafe"
          />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
