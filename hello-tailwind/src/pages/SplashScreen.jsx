// SplashScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // navigate to home after 2.5 seconds
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#097abe] to-[#34c3ff] relative overflow-hidden">
      {/* Background animated circles */}
      <motion.div
        className="absolute w-72 h-72 bg-white opacity-10 rounded-full top-1/4 left-1/4"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-white opacity-20 rounded-full bottom-1/4 right-1/4"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-white text-8xl font-extrabold z-10"
      >
        Know
        <span className="text-black">U</span>
      </motion.h1>

      {/* Bottom "Powered by Microsoft" */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 text-white text-sm font-medium z-10"
      >
        Powered by KnowU
      </motion.p>
    </div>
  );
};

export default SplashScreen;
