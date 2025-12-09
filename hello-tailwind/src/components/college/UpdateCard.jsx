// UpdateCard.jsx
import React, { useState } from "react";

const UpdateCard = ({ update, maxVisibleTags = 4 }) => {
  const [expanded, setExpanded] = useState(false);

  // Tags to show
  const visibleTags = expanded ? update.tags : update.tags.slice(0, maxVisibleTags);
  const remainingCount = update.tags.length - maxVisibleTags;

  // Badge logic based on original title
  let badgeLabel = "Info";
  let badgeColor = "bg-gray-500";

  if (update.title.includes("CR")) {
    badgeLabel = "CR";
    badgeColor = "bg-blue-500";
  } else if (update.title.includes("Professor")) {
    badgeLabel = "Professor";
    badgeColor = "bg-green-600";
  } else if (update.title.includes("Event") || update.title.includes("Events")) {
    badgeLabel = "Events";
    badgeColor = "bg-gray-500";
  }

  return (
    <div className="flex flex-row gap-6 items-stretch">
      {/* Image Card */}
      <div className="relative group w-1/3 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition h-40 flex-shrink-0">
        <img
          src={update.image}
          alt={update.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Badge */}
        <span
          className={`absolute top-0 left-0 ${badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-br-lg shadow`}
        >
          {badgeLabel}
        </span>
      </div>

      {/* Content Card */}
      <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition w-2/3 flex flex-col justify-center h-40">
        {/* Show name only */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{update.name}</h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#097abe] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md transform hover:scale-105 transition cursor-pointer"
            >
              {tag}
            </span>
          ))}

          {!expanded && remainingCount > 0 && (
            <span
              className="bg-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-md cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              +{remainingCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
