import React from "react";
import { UserPlus, Check } from "lucide-react";

const StudentCard = ({ student, isAdded, onToggleFriend }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
        <img
          src={student.img}
          alt={student.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.name
            )}&size=400&background=097abe&color=fff`;
          }}
        />
        {student.role === "CR" && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-br-md">
            CR
          </div>
        )}
        <button
          onClick={() => onToggleFriend(student)}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 ${
            isAdded ? "bg-green-500 hover:bg-green-600" : "bg-[#097abe] hover:bg-[#065a94]"
          } text-white`}
          aria-label={isAdded ? "Friend added" : "Add friend"}
        >
          {isAdded ? <Check size={18} /> : <UserPlus size={18} />}
        </button>
      </div>
      <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm text-center py-1">
        <p className="font-semibold text-sm text-gray-900 truncate">{student.name}</p>
      </div>
    </div>
  );
};

export default StudentCard;
