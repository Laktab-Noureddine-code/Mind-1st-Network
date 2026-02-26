import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section id="contact" className="py-20 px-4 bg-[#eef7fc]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center">
            <img src="/landing/plane.svg" alt="plane svg" loading="lazy" className="w-20 h-20" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Contact Us
            </h2>
          </div>
          <p className="text-[#636E72] mb-8 text-lg">
            Stay in touch and never miss the latest campus updates, trending
            academic articles, and study module opportunities. Reach out for any
            inquiries.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input flex-1 bg-white border border-gray-200 text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:ring-2 focus:ring-[#5bb6ea]/30 focus:border-[#5bb6ea] transition-all text-sm"
                required
              />
              <button
                type="submit"
                className="my-btn px-8 py-3.5 bg-app-primary text-white font-semibold text-sm hover:bg-app-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#5bb6ea]/25 whitespace-nowrap"
              >
                Reach Out
              </button>
            </div>
          </form>

          {/* Trust note */}
          <p className="text-[#636E72] text-xs mt-4">
            📬 We respect your privacy and won't send spam.
          </p>
        </div>
      </div>
    </section>
  );
}
