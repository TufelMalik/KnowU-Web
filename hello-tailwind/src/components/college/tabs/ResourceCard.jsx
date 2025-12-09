import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const ResourceCard = ({ res }) => {
  const [timeAgo, setTimeAgo] = useState("");

  // Use uploadedAt from resource or default to now
  const uploadedAt = res.uploadedAt ? new Date(res.uploadedAt) : new Date();

  const calculateTimeAgo = () => {
    const now = new Date();
    const diff = Math.floor((now - uploadedAt) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} day ago`;
  };

  useEffect(() => {
    setTimeAgo(calculateTimeAgo());
    const interval = setInterval(() => setTimeAgo(calculateTimeAgo()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative border rounded-2xl shadow-md flex flex-col bg-white transition-all duration-200 overflow-hidden"
    >
      <span className="absolute top-3 right-3 px-2 py-0.5 text-xs bg-[#097abe]/20 text-[#097abe] rounded-full z-10">
        {res.category}
      </span>

      <div className="flex items-stretch">
        {/* Image */}
        <img
          src={res.user.img}
          alt={res.user.name}
          className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between px-4 py-2">
          <div className="overflow-hidden">
            <h2 className="font-semibold text-sm md:text-base truncate">{res.title}</h2>
            <p className="text-gray-600 text-xs md:text-sm truncate">{res.description}</p>
          </div>

          <div className="flex justify-between items-center mt-2 text-xs md:text-sm">
            <div className="text-gray-400 font-medium">
              <p className="truncate">Uploaded by {res.user.name}</p>
              <p className="text-gray-500 text-[10px] md:text-xs">{timeAgo}</p>
            </div>
            <a
              href={res.link}
              download
              className="flex items-center gap-1 text-[#097abe] hover:text-[#065c91] transition"
            >
              <Download size={14} /> Download
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
