import React from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-4 bg-white">
      <motion.div
        className="flex items-center border rounded-xl px-4 py-3 transition-all duration-200 cursor-text focus-within:ring-2 focus-within:ring-[#097abe] focus-within:border-[#097abe]"
        initial={{ backgroundColor: "#ffffff" }}
        whileFocus={{ backgroundColor: "#f0f9ff" }}
      >
        {/* Search Icon */}
        <Search
          className={`w-5 h-5 transition-colors duration-200 ${
            searchQuery ? "text-[#097abe]" : "text-gray-400"
          }`}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search chats..."
          className="ml-3 w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="ml-2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
