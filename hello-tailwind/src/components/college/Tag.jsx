// TagList.jsx
import React from "react";

const TagList = ({ tags, maxVisible = 4 }) => {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className="flex gap-2">
      {visibleTags.map((tag, index) => (
        <div
          key={index}
          className="w-10 h-10 flex items-center justify-center bg-[#097abe] text-white text-xs font-semibold rounded shadow-md transform hover:scale-105 transition"
        >
          {tag}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-700 text-xs font-semibold rounded shadow-md">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default TagList;
