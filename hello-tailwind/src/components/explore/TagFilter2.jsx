// TagFilter.jsx
import React from "react";

const TagFilter = ({ tags, selectedTag, onSelectTag }) => {
  const tagColors = {
    "Computer Science": "#3B82F6",       // Blue
    "Business Administration": "#10B981", // Green
    "Mechanical Engineering": "#F59E0B",  // Orange
    Design: "#EC4899",                     // Pink
    "Electrical Engineering": "#8B5CF6",  // Purple
    Marketing: "#EF4444",                  // Red
    All: "#a0a2a7ff",                        // Gray
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-2 px-2 sm:px-0 flex-nowrap scrollbar-hide">
      {tags.map((tag) => {
        const isActive = selectedTag === tag;
        const bgColor = isActive ? tagColors[tag] || "#6366F1" : "#FFFFFF";
        const textColor = isActive ? "#FFFFFF" : "#374151";
        const borderColor = isActive ? tagColors[tag] || "#6366F1" : "#D1D5DB";

        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={`rounded-full px-4 py-2 font-medium min-w-max text-center transition-all duration-200 transform ${
              isActive ? "shadow-md scale-105" : "hover:scale-105 hover:shadow-md"
            }`}
            style={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}` }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;
