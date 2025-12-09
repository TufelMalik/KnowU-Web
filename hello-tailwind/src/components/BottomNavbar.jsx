import React, { useState, useEffect } from "react";
import { BsHouse, BsSearch, BsBuilding, BsBell, BsPerson } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const [active, setActive] = useState("home");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Automatically set active tab based on path
  useEffect(() => {
    const pathToActive = {
      "/": "home",
      "/search": "search",
      "/college": "college",
      "/notifications": "notifications",
      "/profile": "profile",
    };
    setActive(pathToActive[location.pathname] || "home");
  }, [location.pathname]);

  // Show/hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Hide navbar on specific routes
  const hiddenRoutes = ["/onboarding", "/signup", "/login"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const navItems = [
    { name: "home", icon: <BsHouse />, label: "Home", route: "/" },
    { name: "search", icon: <BsSearch />, label: "Explore", route: "/search" },
    { name: "college", icon: <BsBuilding />, label: "College", route: "/college" },
    { name: "notifications", icon: <BsBell />, label: "Alerts", route: "/notifications" },
    { name: "profile", icon: <BsPerson />, label: "Profile", route: "/profile" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <Link key={item.name} to={item.route} onClick={() => setActive(item.name)}>
            <div className="flex flex-col items-center justify-center gap-1 px-4 py-0 transition-all duration-200 group">
              <div
                className={`text-2xl transition-colors duration-200 ${
                  active === item.name ? "text-[#097abe]" : "text-gray-500 group-hover:text-[#097abe]"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  active === item.name
                    ? "text-[#097abe]"
                    : "text-gray-600 group-hover:text-[#097abe]"
                }`}
              >
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
