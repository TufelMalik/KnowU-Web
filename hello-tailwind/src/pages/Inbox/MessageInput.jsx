import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageInput = ({ message, setMessage, isTyping, handleSend }) => (
  <div className="relative flex-1">
    <input
      type="text"
      placeholder="Type a message..."
      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    <AnimatePresence>
      {isTyping && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          Typing...
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

export default MessageInput;
