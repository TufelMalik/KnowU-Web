import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional: nicer arrow icon

const ClubHeader = ({ clubName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center relative max-w-4xl mx-auto px-4 sm:px-6 py-4">
      {/* Back button (icon only, no bg) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 p-1 hover:text-[#097abe] transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={24} /> {/* Using Lucide icon for modern look */}
      </button>

      {/* Club name */}
      <h1 className="text-xl sm:text-2xl font-bold text-black">
        {clubName}
      </h1>
    </div>
  );
};

export default ClubHeader;
