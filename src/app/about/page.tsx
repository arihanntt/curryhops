"use client";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "Is it possible to pay for an order with Visa and MasterCard payment cards?",
    answer:
      "Yes, we accept Visa and MasterCard payment cards for your convenience.",
  },
  {
    question: "Is it possible to pay by credit card?",
    answer: "Yes, you can pay using your credit card easily and securely.",
  },
  {
    question: "What payment methods exist in your company?",
    answer:
      "We support multiple payment methods including Visa, MasterCard, and other secure options.",
  },
  {
    question: "Can I return the product after purchase?",
    answer: "Yes, products can be returned as per our return policy guidelines.",
  },
  {
    question: "How do I use a promotional code?",
    answer:
      "Simply enter your promotional code at checkout to receive your discount.",
  },
  {
    question: "What is the validity period of the gift certificate?",
    answer: "Gift certificates are valid for 12 months from the date of purchase.",
  },
  {
    question: "What if the prepaid goods are not delivered?",
    answer:
      "If prepaid goods are not delivered, please contact our support team for assistance.",
  },
  {
    question: "Where and how can I exchange or refund?",
    answer:
      "Refunds and exchanges can be processed via our support team within the policy period.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Parallax effect handler
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section with Parallax Background */}
      <div
        className="relative w-full h-100 bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/faq-bg.jpg')",
          backgroundPositionY: `${offsetY * 0.5}px`, // parallax effect
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* dark overlay */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-yellow-400 mt-2 font-medium">
            Home / Frequently Asked Questions
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="w-full max-w-4xl mx-auto py-12 px-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100"
            >
              {faq.question}
              <span className="text-xl font-bold text-yellow-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 bg-white border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pb-12">
        <button className="px-4 py-2 bg-yellow-400 text-white font-medium">
          1
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100">
          2
        </button>
      </div>
    </div>
  );
}