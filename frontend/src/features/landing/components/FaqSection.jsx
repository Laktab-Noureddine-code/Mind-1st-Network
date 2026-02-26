import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is the Academic Learning Network free for students?",
    answer:
      "Yes! The core platform is 100% free for students. Our goal is to connect you with the resources and study modules you need to succeed without any financial barriers.",
  },
  {
    question: "How is this different from standard social media?",
    answer:
      "Unlike generic social networks, M1N is entirely distraction-free and academia-focused. Your feed is curated strictly around the classes you take, the topics you study, and the modules you join. No clickbait, no endless scrolling—just learning.",
  },
  {
    question:
      "Can I create a private Study Module for my specific university class?",
    answer:
      "Absolutely. You can create public modules for general topics or strictly private modules where you can invite only the peers from your specific university lecture to share notes securely.",
  },
  {
    question: "What is the Academic Wiki feature?",
    answer:
      "The Academic Wiki is a rich-text publishing tool. It allows you to write structured tutorials, share complex code snippets, and post formatted lecture notes that your peers can easily read, search, and reference all semester long.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 bg-white relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Frequently Asked{" "}
              <span className="text-app-primary">Questions</span>
            </h2>
            <img
              src="/landing/question.svg"
              className="w-20 h-20"
              alt="question svg"
              loading="lazy"
            />
          </div>
          <p className="text-[#636E72] text-lg">
            Everything you need to know about the platform.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-[#fcfcfc] shadow-md border-app-primary/30"
                    : "bg-white hover:border-[#9fdcff] shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <h3
                    className={`font-semibold text-lg transition-colors duration-300 ${isOpen ? "text-app-primary" : "text-[#2D3436]"}`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-app-primary/10 text-app-primary"
                        : "bg-gray-50 text-[#636E72]"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[#636E72] leading-relaxed border-t border-gray-100/50 mt-2">
                        <div className="pt-4">{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
