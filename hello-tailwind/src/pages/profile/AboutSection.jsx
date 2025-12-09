import React from "react";

const AboutSection = ({ bio, isCollapsed, onToggle }) => {
  return (
    <div className="mt-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-900 text-lg">About</h3>
        <button
          onClick={onToggle}
          className="text-[#097abe] text-sm font-semibold hover:text-[#0a5d8a] transition-colors duration-200"
        >
          {isCollapsed ? "Show more" : "Show less"}
        </button>
      </div>
      <p
        className={`text-gray-700 text-sm leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? "line-clamp-2" : "line-clamp-none"
        }`}
      >
        {bio}
      </p>
    </div>
  );
};

export default AboutSection;
