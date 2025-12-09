import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "/assets/knowus1.jpg",
    title: (
      <>
        <span className="text-black">Welcome to </span>
        <span className="text-[#097abe]">KnowU</span>
      </>
    ),
    content: "Connect, learn, and grow with KnowU — your personal learning companion.",
  },
  {
    image: "/assets/knowus2.png",
    title: (
      <>
        <span className="text-black">Build </span>
        <span className="text-[#097abe]">Connections</span>
      </>
    ),
    content:
      "Discover and connect with like-minded people, share knowledge, and expand your learning network effortlessly.",
  },
  {
    image: "/assets/knowus3.png",
    title: (
      <>
        <span className="text-black">Smart </span>
        <span className="text-[#097abe]">Academic</span>
      </>
    ),
    content:
      "Access personalized learning content, track your progress, and achieve your personal and professional goals efficiently.",
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Last slide clicked → go to splash screen
      navigate("/splash");
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="flex flex-col h-screen bg-white px-4 relative">
      <div className="flex-1 flex flex-col items-center justify-start w-full pt-4">
        <h2 className="text-4xl font-bold mb-4 text-center">
          {slides[currentSlide].title}
        </h2>

        <img
          src={slides[currentSlide].image}
          alt="Onboarding Slide"
          className="w-full max-w-[600px] h-[500px] object-cover rounded-lg"
        />

        <p className="text-gray-600 text-center mt-4 px-4">
          {slides[currentSlide].content}
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 text-black font-semibold border border-black rounded-lg"
        >
          Back
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-[#097abe]" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#097abe] text-white rounded-lg font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
