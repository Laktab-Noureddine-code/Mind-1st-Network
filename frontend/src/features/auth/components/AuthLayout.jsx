import { Link, useLocation } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen w-full bg-[#E5E5E5] relative flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Top Header */}
      <div className="absolute top-0 w-full p-6 sm:p-10 flex justify-between items-center z-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 md:h-10 object-contain"
          />
        </Link>
      </div>

      {/* Abstract Wavy Background Pattern */}
      <div className="absolute w-full top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-30 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <svg
            key={i}
            width="100%"
            height="20"
            viewBox="0 0 1440 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10C120 -5 240 25 360 10C480 -5 600 25 720 10C840 -5 960 25 1080 10C1200 -5 1320 25 1440 10"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>

      {/* Floating Avatars (Absolute positioning matching the reference) */}
      <img
        src="/auth/shape1.svg"
        alt="Avatar"
        className="absolute left-[15%] top-[40%] w-24 h-24 object-contain z-10 hidden md:block drop-shadow-md -rotate-12"
      />
      <img
        src="/auth/shape5.svg"
        alt="Avatar"
        className="absolute left-[5%] top-[20%] w-24 h-24 object-contain z-10 hidden md:block drop-shadow-md -rotate-12"
      />
      <img
        src="/auth/shape2.svg"
        alt="Avatar"
        className="absolute left-[5%] bottom-[25%] w-20 h-20 object-contain z-10 hidden lg:block drop-shadow-md rotate-12"
      />

      <img
        src="/auth/shape3.svg"
        alt="Avatar"
        className="absolute right-[10%] top-[35%] w-32 h-32 object-contain z-10 hidden xl:block drop-shadow-md rotate-[15deg]"
      />
      <img
        src="/auth/shape4.svg"
        alt="Avatar"
        className="absolute right-[20%] bottom-[35%] w-24 h-24 object-contain z-10 hidden md:block drop-shadow-md -rotate-6"
      />
      <img
        src="/auth/shape6.svg"
        alt="Avatar"
        className="absolute right-[10%] bottom-[15%] w-24 h-24 object-contain z-10 hidden md:block drop-shadow-md -rotate-6"
      />

      {/* Central Auth Form Card */}
      <div className="relative z-20 w-full max-w-md bg-[#F4F4F4] rounded-[2rem] p-4 md:p-6 shadow-2xl flex flex-col items-center mx-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 text-center mb-8 px-4">
          {subtitle}
        </p>

        <div className="w-full">{children}</div>
      </div>

      {/* Footer */}
      <div className="w-full text-center z-20">
        <p className="text-xs font-semibold text-gray-500">
          Copyright @Mind 1st Network &nbsp;|&nbsp; Privacy Policy
        </p>
      </div>
    </div>
  );
}
