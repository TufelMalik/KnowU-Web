import React from "react";
import { ArrowLeft, Settings } from "lucide-react";

const ProfileHeader = ({ onBack, onSettings }) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-r from-[#097abe] to-[#0a5d8a] py-2 flex items-center justify-between relative">
      
      {/* Back Arrow at very left */}
      <button
        onClick={onBack}
        className="p-2 ml-1 hover:bg-white/10 rounded-lg transition-all duration-200"
      >
        <ArrowLeft size={24} className="text-white" />
      </button>

      {/* Center Profile Label */}
      <div className="flex-1 mx-6 bg-white/20 backdrop-blur-sm px-10 py-1.5 rounded-full text-center">
        <h1 className="text-white font-bold text-lg">Profile</h1>
      </div>

      {/* Settings Button */}
      <button
        onClick={onSettings}
        className="p-2 mr-1 hover:bg-white/10 rounded-lg transition-all duration-200"
      >
        <Settings size={24} className="text-white" />
      </button>
    </div>
  );
};

export default ProfileHeader;
