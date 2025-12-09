// SearchBar.jsx
import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleChange = (e) => setSearchQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="p-4 bg-transparent">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        {/* Search Icon */}
        <FiSearch
          className="absolute left-4 text-2xl pointer-events-none"
          style={{ color: "#097abe" }}
        />

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full pl-12 pr-10 py-3 rounded-full border-2 focus:outline-none focus:ring-2 transition"
          style={{ borderColor: "#097abe", borderWidth: "2px", color: "#000" }}
        />

        {/* Clear button */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 text-gray-500 hover:text-gray-700"
          >
            <FiX className="text-xl" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
