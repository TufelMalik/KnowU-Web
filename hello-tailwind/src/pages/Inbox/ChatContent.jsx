import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ChatContent = ({ messages }) => {
  const containerRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col space-y-1"
    >
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
        >
          <div className="flex items-end">
            {/* Left avatar for received messages */}
            {msg.sender === "other" && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full mr-2 object-cover"
              />
            )}

            {/* Message bubble */}
            <div
              className={`inline-block min-w-[60px] p-2 break-words max-w-[80%] ${
                msg.sender === "me"
                  ? "bg-[#097ABE] text-white rounded-lg rounded-br-none"
                  : "bg-white text-gray-800 rounded-lg rounded-bl-none shadow"
              }`}
            >
              <p className="text-sm leading-tight">{msg.text}</p>
              <span
                className={`text-[10px] mt-0.5 block ${
                  msg.sender === "me" ? "text-gray-200 text-right" : "text-gray-500 text-left"
                }`}
              >
                {msg.time}
              </span>
            </div>

            {/* Right avatar for sent messages */}
            {msg.sender === "me" && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full ml-2 object-cover"
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatContent;
