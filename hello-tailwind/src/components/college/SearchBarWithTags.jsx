import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const SearchBarWithTags = ({
  allTags,
  selectedTag,
  setSelectedTag,
  searchTerm,
  setSearchTerm,
}) => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sorted tags alphabetically
  const sortedTags = [...allTags].sort((a, b) => a.localeCompare(b));

  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search updates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
        <button
          onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md border hover:bg-gray-200 transition"
        >
          {selectedTag || "Filter Tag"} <ChevronDown size={16} />
        </button>
      </div>

      {tagDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-auto bg-white border rounded-lg shadow-lg z-10 transition-all duration-200">
          {sortedTags.map((tag) => (
            <div
              key={tag}
              onClick={() => {
                setSelectedTag(selectedTag === tag ? "" : tag);
                setTagDropdownOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-blue-100 transition ${
                selectedTag === tag ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithTags;
