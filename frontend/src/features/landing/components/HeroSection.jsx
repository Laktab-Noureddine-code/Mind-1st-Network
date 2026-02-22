import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
     
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Hero Illustration */}
          <div className="relative flex justify-center order-2 lg:order-1 mt-10 lg:mt-0">
            <img
              src="/landing/hero-friends.png"
              alt="Professional Social Network Illustration"
              className="w-full max-w-none object-contain relative z-20 scale-110 md:scale-125 origin-center"
            />
          </div>

          {/* Right Content - Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#5bb6ea] leading-tight mb-4 drop-shadow-sm">
              Professional
              <span className="block text-[#202a44] font-black tracking-tight mt-1">SOCIAL NETWORK</span>
            </h1>
            <p className="text-[#636E72] text-sm md:text-base mb-8 max-w-lg mx-auto lg:mx-0 font-medium">
              A full-stack social network web application built to foster professional and community interactions through blogging, pages, and groups. Create profiles, write articles, and connect with your community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-[#202a44] text-white font-semibold shadow-lg hover:bg-[#151c2d] hover:-translate-y-0.5 transition-all"
              >
                Join Us
              </Link>
              <a
                href="#service"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-[#5bb6ea] text-white font-semibold shadow-lg hover:bg-[#4a96c4] hover:-translate-y-0.5 transition-all"
              >
                Learn More
              </a>
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
