import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CameraIcon, PhotoIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const OptionsMenu = ({ onSelect, isOpen }) => {
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const options = [
    { icon: CameraIcon, label: "Camera", color: "text-red-500", bg: "bg-red-100" },
    { icon: PhotoIcon, label: "Gallery", color: "text-green-500", bg: "bg-green-100" },
    { icon: DocumentTextIcon, label: "Document", color: "text-blue-500", bg: "bg-blue-100" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, staggerChildren: 0.07, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSelect = (label) => {
    if (label === "Camera") {
      cameraInputRef.current?.click();
    } else if (label === "Gallery") {
      fileInputRef.current?.click();
    } else if (label === "Document") {
      docInputRef.current?.click();
    }
    onSelect && onSelect(label);
  };

  return (
    <>
      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/*"
        ref={cameraInputRef}
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => console.log("Camera File:", e.target.files[0])}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => console.log("Gallery File:", e.target.files[0])}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        ref={docInputRef}
        style={{ display: "none" }}
        onChange={(e) => console.log("Document File:", e.target.files[0])}
      />

      {/* Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="absolute bottom-16 right-0 flex flex-col space-y-2 p-1"
          >
            {options.map(({ icon: Icon, label, color, bg }) => (
              <motion.button
                key={label}
                variants={itemVariants}
                whileHover={{ scale: 1.07, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(label)}
                className="group flex items-center justify-between p-2 rounded-lg 
                           transition-all duration-200 hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${bg}`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-gray-500 transition-all">
                  Open
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OptionsMenu;
