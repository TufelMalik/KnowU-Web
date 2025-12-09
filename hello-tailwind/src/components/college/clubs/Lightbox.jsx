import React from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ photos, selectedIndex, onNext, onPrev, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Click to Close */}
      <div
        className="absolute inset-0 cursor-zoom-out"
        onClick={onClose}
      ></div>

      {/* Close Button */}
      <motion.button
        className="absolute top-6 right-6 text-white p-2.5 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
      >
        <X size={26} />
      </motion.button>

      {/* Prev Button */}
      <motion.button
        className="absolute left-6 text-white p-2.5 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <ChevronLeft size={30} />
      </motion.button>

      {/* Next Button */}
      <motion.button
        className="absolute right-6 text-white p-2.5 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight size={30} />
      </motion.button>

      {/* Image Container */}
      <motion.div
        key={selectedIndex}
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -40 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="relative z-40 flex items-center justify-center"
      >
        <motion.img
          src={photos[selectedIndex]}
          alt={`Zoom ${selectedIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x > 100) onPrev();
            if (info.offset.x < -100) onNext();
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
