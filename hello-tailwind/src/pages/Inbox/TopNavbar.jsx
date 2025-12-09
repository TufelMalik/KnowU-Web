import React from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TopNavbar = ({ onNewChatClick, newChats = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-40">
      {/* Back Arrow */}
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="cursor-pointer p-1 rounded-full hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-lg font-semibold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Chats
      </motion.h1>

      {/* New Chat / Pencil */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer p-1 rounded-full hover:bg-gray-100"
        onClick={onNewChatClick}
      >
        <Pencil className="w-6 h-6 text-gray-700" />
        {newChats > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
        )}
      </motion.div>
    </div>
  );
};

export default TopNavbar;
