// AddResourceButton.jsx
import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const AddResourceButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-36 right-6 z-50 flex items-center gap-2 bg-[#097abe] text-white rounded-full px-5 py-3 shadow-lg hover:bg-[#065c91] transition-all duration-200"
  >
    <Plus size={22} />
    <span className="font-medium">Add Resource</span>
  </motion.button>
);

export default AddResourceButton;
