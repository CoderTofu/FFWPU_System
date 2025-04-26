"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [{ text: "Hello! How can I assist you today?", isUser: false }]
  );
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]); // Updated dependency

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, isUser: true }]);
      setInputMessage("");
      // Simulate bot response (replace with actual chatbot logic)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for your message. I'm processing your request.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
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
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    message.isUser
                      ? "bg-[#FCC346] text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCC346]"
              />
              <button
                type="submit"
                className="bg-[#01438F] text-white p-2 rounded-md hover:bg-[#02326A] transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white border-[#FCC346] border-2 p-4 rounded-full shadow-lg hover:bg-[#FCC346] transition-colors duration-300 ease-in-out"
        >
          <img src="/icons/chatbot_icon.svg" className="h-8" alt="" />
        </button>
      )}
    </div>
  );
}
