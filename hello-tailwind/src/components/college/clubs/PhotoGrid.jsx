import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const PhotoGrid = ({ photos, onSelect }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-[2px] sm:gap-1">
      {photos.map((photo, idx) => (
        <motion.div
          key={idx}
          className="relative group overflow-hidden aspect-square rounded-lg cursor-pointer bg-neutral-900"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          onClick={() => onSelect(idx)}
        >
          {/* Image */}
          <img
            src={photo}
            alt={`Photo ${idx + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
            draggable="false"
          />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Eye size={28} className="text-white drop-shadow-md" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGrid;
