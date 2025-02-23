"use client";

import { useEffect, useState } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";

export default function Notification({ message, type }) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setOpacity(0); // Start fade-out animation
    }, 2700); // Fade out shortly before the 3-second mark

    const hideTimer = setTimeout(() => {
      setVisible(false); // Remove alert after fade-out
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2  flex items-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <div
        className={`p-4 ${
          type === "error" ? "bg-red-500" : "bg-green-500"
        } text-white flex space-x-2 max-w-[500px] items-center rounded-full px-5 shadow-md min-w-[120px] text-wrap`}
      >
        <span>
          {type === "error" ? (
            <CircleX size={26} />
          ) : (
            <CircleCheckBig size={26} />
          )}
        </span>
        <p className="text-lg break-words overflow-hidden">{message}</p>
      </div>
    </div>
  );
}
