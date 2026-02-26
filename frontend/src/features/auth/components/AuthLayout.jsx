import { Link, useLocation } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Column - Illustration & Toggle */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-gray-100 relative">
          <div className="flex-1 flex items-center justify-center w-full">
            {/* User handles the image here */}
            <img
              src={
                isLogin
                  ? "/auth/login-illustration.png"
                  : "/auth/signup-illustration.png"
              }
              alt="Authentication illustration"
              className="w-full max-w-[300px] h-auto object-contain"
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              to={isLogin ? "/register" : "/login"}
              className="text-sm font-semibold text-gray-700 underline hover:text-app-primary transition-colors"
            >
              {isLogin ? "Create an account" : "Log in to your account"}
            </Link>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            <h1 className="text-3xl font-black text-gray-900 mb-8">{title}</h1>
            <div className="w-full">{children}</div>

            {/* Social Login Section */}
            <div className="mt-8 pt-8 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm text-gray-500 font-medium">
                Or {isLogin ? "login" : "signup"} with
              </span>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity aria-label='Facebook'">
                  <span className="font-bold text-sm">f</span>
                </button>
                <button className="w-8 h-8 rounded bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity aria-label='Twitter'">
                  <i className="lucide-twitter">t</i>
                </button>
                <button className="w-8 h-8 rounded bg-[#DB4437] flex items-center justify-center text-white hover:opacity-90 transition-opacity aria-label='Google'">
                  <span className="font-bold text-sm">G</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
