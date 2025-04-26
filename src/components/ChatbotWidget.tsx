"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const qaPairs = [
  {
    question: "What is the Family Federation for World Peace and Unification?",
    answer:
      "The Family Federation for World Peace and Unification (FFWPU) is a global organization founded by Rev. Sun Myung Moon and Dr. Hak Ja Han Moon, promoting peace through family values and interfaith cooperation.",
  },
  {
    question: "When was FFWPU founded?",
    answer: "The FFWPU was founded in 1996, evolving from the Unification Church established in 1954.",
  },
  {
    question: "What are the main activities of FFWPU?",
    answer:
      "FFWPU engages in activities such as marriage blessing ceremonies, interfaith dialogue, youth leadership training, and initiatives for world peace and family strengthening.",
  },
  {
    question: "Who are the founders of FFWPU?",
    answer: "Rev. Sun Myung Moon and Dr. Hak Ja Han Moon are the founders of the Family Federation for World Peace and Unification.",
  },
  {
    question: "What is the mission of FFWPU?",
    answer:
      "The mission of FFWPU is to realize a world of peace centered on God through the establishment of true families that embody love, peace, and unity.",
  },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! Please select a question below.", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSelectQuestion = (question: string, answer: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: question, isUser: true }]);
    // Show typing animation
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: answer, isUser: false }]);
    }, 1500); // 1.5 seconds typing simulation
  };

  return (
    <div className="fixed bottom-5 right-5 z-10">
      {isOpen ? (
        <div className="bg-white border-[#FCC346] border-2 rounded-lg shadow-xl w-80 h-96 flex flex-col transition-all duration-300 ease-in-out">
          <div className="bg-[#01438F] text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-75 transition-opacity"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    message.isUser ? "bg-[#FCC346] text-black" : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-2 rounded-lg bg-gray-200 text-black animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex flex-col space-y-2 overflow-y-auto max-h-40">
            {qaPairs.map((pair, index) => (
              <button
                key={index}
                onClick={() => handleSelectQuestion(pair.question, pair.answer)}
                disabled={isTyping} // Prevent user from selecting while bot is "typing"
                className="text-left p-2 border rounded-md hover:bg-[#FCC346] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pair.question}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white border-[#FCC346] border-2 p-4 rounded-full shadow-lg hover:bg-[#FCC346] transition-colors duration-300 ease-in-out"
        >
          <img src="/icons/chatbot_icon.svg" className="h-8" alt="Chatbot Icon" />
        </button>
      )}
    </div>
  );
}
