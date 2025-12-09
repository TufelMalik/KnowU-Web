import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const AdvancedEmojiSelector = ({ addEmoji }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    addEmoji(emojiData.emoji);
    setIsOpen(false); // auto-close picker
  };

  return (
    <div className="relative z-50">
      {/* 😄 Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-all duration-200 ${
          isOpen ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        <FaceSmileIcon className="w-6 h-6 text-gray-600" />
      </button>

      {/* 🌟 Emoji Picker Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Picker Panel */}
            <motion.div
              key="picker"
              initial={{ x: 300, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 300, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="fixed right-4 bottom-20 z-50 w-80 h-96 bg-white rounded-2xl shadow-xl overflow-auto border border-gray-200"
            >
              {/* ❌ Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>

              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                emojiStyle="apple"
                theme="light"
                width="100%"
                height="100%"
                previewConfig={{ showPreview: false }}
                searchDisabled={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedEmojiSelector;
