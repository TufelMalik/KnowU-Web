import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ search, setSearch, onSearch }) => {
  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  const clearSearch = () => setSearch("");

  return (
    <div className="w-full -mt-4 bg-transparent">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        {/* Search Icon */}
        <FiSearch
          className="absolute left-4 text-2xl pointer-events-none"
          style={{ color: "#097abe" }}
        />

        {/* Input */}
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full pl-12 pr-10 py-3 rounded-full border-2 focus:outline-none focus:ring-2 transition"
          style={{ borderColor: "#097abe", borderWidth: "2px", color: "#000" }}
        />

        {/* Clear button */}
        {search && (
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
