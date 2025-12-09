import React from "react";
import { Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ClubCard2 = ({ club, onJoin }) => {
  const navigate = useNavigate();

  // Convert club name to URL-safe slug
  const slug = club.name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleCardClick = (e) => {
    // Prevent button click from triggering card navigation
    if (e.target.closest("button")) return;
    navigate(`/clubs/${slug}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="relative flex flex-col sm:flex-row bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer"
    >
      {/* Club Image */}
      <div className="sm:w-1/3 w-full h-40 sm:h-48 overflow-hidden">
        <motion.img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              club.name
            )}&size=400&background=0A66C2&color=fff`;
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 sm:p-5 w-full sm:w-2/3 relative">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
            {club.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Users size={16} className="mr-1.5 text-blue-600" />
            President:{" "}
            <span className="ml-1 font-medium text-gray-800">
              {club.president || "N/A"}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {club.description || "No description available."}
          </p>
        </div>

        {/* Join Button */}
       {/* Join Button */}
<motion.button
  whileHover={{ x: 5 }}
  onClick={() => {
    if (onJoin) onJoin(club);
    else alert(`Joined ${club.name}!`);
  }}
  className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-[#097abe] text-white text-sm font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
>
  Join Now
  <ArrowRight size={16} />
</motion.button>

      </div>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    </motion.div>
  );
};

export default ClubCard2;
