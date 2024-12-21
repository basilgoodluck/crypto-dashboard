import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is castling in chess?",
      answer: "Castling is a special move in chess where the king and a rook move simultaneously to improve the king's safety and connect the rooks."

    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How does state work in React?",
      answer: "State in React allows components to manage and respond to dynamic data.",
    },
    {
      question: "How do I install React Icons?",
      answer: "You can install React Icons using `npm install react-icons`.",
    },
    {
      question: "What is Express.js?",
      answer: "Express.js is a fast and minimalist web application framework for Node.js, used for building APIs and web applications."

    },
    {
      question: "What is TypeScript?",
      answer: "TypeScript is a strongly typed programming language that builds on JavaScript, providing optional static typing and modern features for improved development experience.",

    },
    {
      question: "What is Docker?",
      answer: "Docker is a platform for developing, shipping, and running applications inside lightweight, portable containers."

    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="w-11/12 md:w-4/5 mx-auto py-24">
        <h1 className="text-xl font-bold text-center mb-4">FAQs</h1>
        <div className="space-y-4 md:w-4/5 mx-auto">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
              >
                <span className="text-sm font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="text-xl" />
                ) : (
                  <FiChevronDown className="text-xl" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out  ${
                  openIndex === index ? "max-h-[400px]" : "max-h-[0px]"
                }`}
              >
                <div className="p-4 text-gray-700 bg-white ">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;


