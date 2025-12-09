// TagFilter.jsx
import React from "react";

const TagFilter = ({ tags, selectedTag, onSelectTag }) => {
  // Define colors for each tag
  const tagColors = {
    Tech: "bg-blue-500 text-white border-blue-500 hover:bg-blue-600",
    Design: "bg-pink-500 text-white border-pink-500 hover:bg-pink-600",
    Music: "bg-green-500 text-white border-green-500 hover:bg-green-600",
    Startup: "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600",
    Art: "bg-purple-500 text-white border-purple-500 hover:bg-purple-600",
    All: "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300",
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
      {tags.map((tag) => {
        const isActive = selectedTag === tag;
        const activeClass = tagColors[tag] || "bg-indigo-500 text-white border-indigo-500";
        const baseClass = isActive
          ? `rounded-full px-4 py-2 font-medium shadow-md transform scale-105 transition-all duration-200 ${activeClass}`
          : "rounded-full px-4 py-2 font-medium bg-white text-gray-700 border border-gray-300 hover:scale-105 hover:shadow-md transition-transform duration-200";

        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={baseClass}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;
