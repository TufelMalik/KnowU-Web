import React, { useState } from "react";
import { Plus, MessageSquare, Users, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButton = () => {
  const [open, setOpen] = useState(false);

  // Mini buttons for different chat types
  const miniButtons = [
    { icon: <MessageSquare />, label: "Personal Chat" },
    { icon: <Users />, label: "Batch Chat" },
    { icon: <BookOpen />, label: "Club Chat" },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Mini buttons */}
      <AnimatePresence>
        {open &&
          miniButtons.map((btn, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 mb-3 px-4 py-2 bg-white rounded-xl shadow-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {btn.icon}
              <span className="text-sm">{btn.label}</span>
            </motion.button>
          ))}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#097abe] text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-[#065a94] transition-colors cursor-pointer"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FloatingButton;
