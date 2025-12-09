import React, { useState } from "react";
import { Search, X } from "lucide-react";
import StudentCard from "./StudentCard";

const Members = ({ students, addedFriends, onToggleFriend }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? "text-[#097abe]" : "text-gray-400"
          }`}
          size={20}
        />

        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 shadow-sm focus:border-[#097abe] focus:ring-2 focus:ring-[#097abe]/30 placeholder-gray-400 outline-none transition-all duration-200"
        />

        {/* Clear (×) button */}
        {searchTerm && (
          <X
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#097abe] transition-colors"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredStudents.map((student, index) => (
          <StudentCard
            key={index}
            student={student}
            isAdded={addedFriends.includes(student.name)}
            onToggleFriend={onToggleFriend}
          />
        ))}
      </div>
    </div>
  );
};

export default Members;
