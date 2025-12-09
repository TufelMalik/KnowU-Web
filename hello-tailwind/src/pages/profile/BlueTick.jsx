import React from "react";
import { Check } from "lucide-react";

const BlueTick = () => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Circular rough-edged blue badge */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-9 h-9 text-[#0095F6] drop-shadow-[0_0_8px_rgba(0,149,246,0.6)]"
        fill="currentColor"
      >
        {/* Wavy, symmetrical edges (perfect circle with bumps) */}
        <path d="M50 5 
          C56 7, 62 8, 68 12 
          C74 16, 80 22, 84 28 
          C88 34, 92 42, 92 50 
          C92 58, 88 66, 84 72 
          C80 78, 74 84, 68 88 
          C62 92, 56 93, 50 95 
          C44 93, 38 92, 32 88 
          C26 84, 20 78, 16 72 
          C12 66, 8 58, 8 50 
          C8 42, 12 34, 16 28 
          C20 22, 26 16, 32 12 
          C38 8, 44 7, 50 5Z" />
      </svg>

      {/* White centered tick */}
      <Check
        size={16}
        strokeWidth={3}
        className="absolute text-white"
      />
    </div>
  );
};

export default BlueTick;
