"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

const predefinedQA: Record<string, string> = {
  'What is FFWPU?':
    'The Family Federation for World Peace and Unification (FFWPU) is a global movement dedicated to building world peace through God-centered families.',
  'How can I join?':
    'You can join by visiting your local FFWPU center or contacting us through Facebook or email.',
  'Where are you located?':
    'Our headquarters are in Quezon City, Philippines. Visit our website for more branch locations.',
  'What events do you have?':
    'We regularly host seminars, workshops, and youth leadership training. Follow us on Facebook for updates.',
  'How can I donate?':
    'You can donate via bank transfer or through our donation portal. Contact us to learn more.',
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hello! How can I assist you today?', isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (message: string) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setShowButtons(false);
    simulateBotResponse(message);
  };

  const simulateBotResponse = (userMessage: string) => {
    const answer = predefinedQA[userMessage] || "Sorry, I don't have an answer for that yet.";
    setIsTyping(true);
    let index = 0;
    let currentText = '';

    const interval = setInterval(() => {
      if (index < answer.length) {
        currentText += answer[index++];
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[prev.length - 1]?.isUser === false) {
            newMessages[prev.length - 1].text = currentText;
          } else {
            newMessages.push({ text: currentText, isUser: false });
          }
          return [...newMessages];
        });
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setShowButtons(true), 300); // Wait briefly before fade-in
      }
    }, 18);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isTyping) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white border-[#FCC346] border-2 rounded-lg shadow-xl w-80 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-[#01438F] text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-sm">FFWPU Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-75 transition-opacity"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg whitespace-pre-wrap ${
                    message.isUser ? 'bg-[#FCC346] text-black' : 'bg-gray-200 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick buttons */}
          {/* Quick buttons */}
          {showButtons && (
            <div className="px-3 pb-2 flex flex-wrap gap-2 animate-fade-in transition-all duration-500 ease-in-out">
              {Object.keys(predefinedQA).map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(question)}
                  className="bg-gray-100 border border-gray-300 text-xs text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-all duration-300"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isTyping ? 'Please wait...' : 'Type your message...'}
                disabled={isTyping}
                className="flex-grow p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FCC346]"
              />
              <button
                type="submit"
                disabled={isTyping}
                className={`p-2 rounded-md transition-colors ${
                  isTyping
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#01438F] text-white hover:bg-[#02326A]'
                }`}
              >
                <Send size={16} />
              </button>
            </form>
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
