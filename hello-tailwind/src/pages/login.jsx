// Login.jsx
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Top Heading */}
      <h1 className="text-4xl font-extrabold text-center text-[#097abe] mt-10 mb-8">
        Login
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
        {/* Email */}
        <div className="relative flex items-center">
          <FiMail className="absolute left-3 text-gray-400 text-xl" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:border-[#097abe] focus:outline-none transition text-base"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="relative flex items-center">
          <FiLock className="absolute left-3 text-gray-400 text-xl" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:border-[#097abe] focus:outline-none transition text-base"
            placeholder="Password"
          />
        </div>
      </form>

      {/* Buttons at the bottom */}
      <div className="w-full max-w-md mx-auto mt-auto mb-10 space-y-4">
        {/* Login Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-[#097abe]/50 transition bg-gradient-to-r from-[#097abe] to-[#097abe]/80 text-base"
        >
          Login
        </button>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-4 border-2 border-[#097abe]/50 rounded-xl shadow-sm hover:bg-[#097abe]/10 transition font-medium text-gray-700 text-base"
        >
          <FcGoogle className="text-2xl" />
          Login with Google
        </button>

        {/* Don't have an account */}
        <p className="text-center text-gray-600 text-sm mt-3">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#097abe] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
