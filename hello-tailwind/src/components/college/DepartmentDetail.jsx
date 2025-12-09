import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, UserPlus } from "lucide-react";

const departmentCourses = {
  USAR: {
    "1st Year": [
      { name: "AIDS", img: "/assets/courses/aids.jpg" },
      { name: "AIML", img: "/assets/courses/aiml.jpg" },
      { name: "AR", img: "/assets/courses/ar.jpg" },
      { name: "IIOT", img: "/assets/courses/iiot.jpg" },
    ],
    "2nd Year": [
      { name: "AIDS", img: "/assets/courses/aids.jpg" },
      { name: "AIML", img: "/assets/courses/aiml.jpg" },
      { name: "AR", img: "/assets/courses/ar.jpg" },
      { name: "IIOT", img: "/assets/courses/iiot.jpg" },
    ],
    "3rd Year": [
      { name: "AIDS", img: "/assets/courses/aids.jpg" },
      { name: "AIML", img: "/assets/courses/aiml.jpg" },
      { name: "AR", img: "/assets/courses/ar.jpg" },
      { name: "IIOT", img: "/assets/courses/iiot.jpg" },
    ],
    "4th Year": [
      { name: "AIDS", img: "/assets/courses/aids.jpg" },
      { name: "AIML", img: "/assets/courses/aiml.jpg" },
      { name: "AR", img: "/assets/courses/ar.jpg" },
      { name: "IIOT", img: "/assets/courses/iiot.jpg" },
    ],
  },
  // Add similar structure for USMC, USAP, USDI
};

const DepartmentDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [addedCourses, setAddedCourses] = useState([]);

  // Decode URL params to get proper department name
  const department = decodeURIComponent(params.department);
  const deptKey = department.toUpperCase().trim();
  const years = departmentCourses[deptKey];

  if (!years) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-gray-500 text-lg">Department "{department}" not found.</p>
        <button
          onClick={() => navigate("/college")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const toggleAddCourse = (courseName) => {
    setAddedCourses((prev) =>
      prev.includes(courseName)
        ? prev.filter((c) => c !== courseName)
        : [...prev, courseName]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/college")}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Department Name */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {deptKey} Courses
      </h1>

      {Object.entries(years).map(([year, courses], idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {year}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {courses.map((course, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/college/${encodeURIComponent(deptKey)}/${encodeURIComponent(
                      year
                    )}/${encodeURIComponent(course.name)}`
                  )
                }
              >
                <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64">
                  <img
                    src={course.img}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        course.name
                      )}&size=400&background=097abe&color=fff`;
                    }}
                  />

                  {/* Add / remove course button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation
                      toggleAddCourse(course.name);
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 ${
                      addedCourses.includes(course.name)
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-[#097abe] hover:bg-[#065a94]"
                    } text-white`}
                  >
                    {addedCourses.includes(course.name) ? <Check size={18} /> : <UserPlus size={18} />}
                  </button>
                </div>

                {/* Course name overlay */}
                <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm text-center py-2">
                  <p className="font-semibold text-sm text-gray-900 truncate">{course.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentDetail;
