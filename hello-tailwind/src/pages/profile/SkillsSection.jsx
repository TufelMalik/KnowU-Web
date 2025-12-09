import React from "react";

const SkillsSection = ({ skills }) => {
  return (
    <div className="mt-6 w-full">
      <h3 className="font-bold text-gray-900 text-lg mb-3">Skills</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-gradient-to-r from-[#097abe] to-[#0a5d8a] text-white text-sm px-5 py-2 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer select-none"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
