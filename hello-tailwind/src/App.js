// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Signup from "./pages/signup";
import Login from "./pages/login";
import Onboarding from "./pages/Onboarding";
import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";
import Search from "./pages/Explore";
import College from "./pages/College";
import Inbox from "./pages/Inbox/Inbox";
import ChatInterface from "./pages/Inbox/ChatInterface";
import Profile from "./pages/Profile"; // ← Import Profile
import Alerts from "./pages/Alerts";

// Explore Components
import EventsPage from "./components/explore/EventsPage";
import SuggestedConnectionsPage from "./components/explore/SuggestedConnectionsPage";
import TrendingStudentsPage from "./components/explore/TrendingStudentsPage";

// College Components
import DepartmentDetail from "./components/college/DepartmentDetail";
import CourseDetail from "./components/college/CourseDetail";
import BatchDetail from "./components/college/BatchDetail";
import ClubsPage from "./components/college/ClubsPage";
import ClubDetail from "./components/college/ClubDetail";

// Layout Components
import BottomNavbar from "./components/BottomNavbar";

const AppWrapper = () => {
  const location = useLocation();

  // Hide BottomNavbar on ChatInterface page
  const hideNavbar =
    (location.pathname.startsWith("/inbox/") && location.pathname !== "/inbox") ||
    location.pathname === "/splash"; // optional: hide on splash

  return (
    <div className="">
      <Routes>
        {/* Splash & Onboarding */}
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/notifications" element={<Alerts />} />
        <Route path="/suggestedconnections" element={<SuggestedConnectionsPage />} />
        <Route path="/trendingstudents" element={<TrendingStudentsPage />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* College Hierarchy */}
        <Route path="/college" element={<College />} />
        <Route path="/college/:department" element={<DepartmentDetail />} />
        <Route path="/college/:department/:year/:course" element={<CourseDetail />} />
        <Route
          path="/college/:department/:year/:course/:batch"
          element={<BatchDetail />}
        />

        {/* Clubs */}
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/:clubname" element={<ClubDetail />} />

        {/* Inbox & Chat */}
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox/:chatName" element={<ChatInterface />} />
      </Routes>

      {/* Show BottomNavbar only if not hidden */}
      {!hideNavbar && <BottomNavbar />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
