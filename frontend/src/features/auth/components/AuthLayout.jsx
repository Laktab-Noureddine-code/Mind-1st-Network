import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({ children, title, subtitle }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen max-h-screen w-full bg-[#fdfaf5] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 w-full flex justify-between items-center px-4 md:px-12 py-6 z-20">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 md:h-10" />
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold text-secondary">
          <Link
            to={isLogin ? "/register" : "/login"}
            className="my-btn bg-app-primary  shadow-sm text-white  duration-300 hidden sm:block"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Abstract Background Shapes matching Landing Page format */}
        <motion.img
          src="/landing/circle1.svg"
          className="absolute top-1/4 left-1/4 w-12 opacity-40"
          alt=""
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/landing/circle2.svg"
          className="absolute bottom-1/4 right-32 w-16 opacity-30"
          alt=""
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Placeholder decorative divs similar to the image's abstract background */}
        <div className="hidden lg:block absolute left-[15%] bottom-32 w-24 h-48 bg-app-primary/20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] rounded-md"></div>
        <div className="hidden lg:block absolute right-[15%] bottom-24 w-32 h-32 bg-secondary/10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] rounded-md"></div>
      </div>

      {/* Form Container with Illustrations */}
      <div className="relative z-10 flex flex-row items-center justify-center w-full px-4">
        {/* Main Card */}
        <div className="relative z-20 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col items-center border border-gray-100/50">
          <h1 className="text-2xl font-black text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">{subtitle}</p>
          <div className="w-full">{children}</div>
        </div>

        {/* Right Illustration */}
        <div className="hidden lg:block absolute left-1/2 ml-[100px] xl:ml-[140px] w-[400px] xl:w-[520px] pointer-events-none z-0">
          <img
            src="/auth/computer.svg"
            alt="Computer"
            loading="lazy"
            className="w-full h-auto object-contain relative"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      </div>
    </div>
  );
}
