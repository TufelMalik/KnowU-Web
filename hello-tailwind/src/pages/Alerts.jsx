import React, { useState, useEffect } from "react";
import { Bell, CalendarDays, MessageSquare, Heart } from "lucide-react";

const sampleNotifications = [
  {
    id: 1,
    category: "Today",
    items: [
      {
        id: "n1",
        icon: <Heart className="w-5 h-5 text-pink-500" />,
        title: "Liam liked your post",
        time: "2h",
      },
      {
        id: "n2",
        icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
        title: "Sophia commented on your post",
        time: "4h",
      },
    ],
  },
  {
    id: 2,
    category: "This Week",
    items: [
      {
        id: "n3",
        icon: <CalendarDays className="w-5 h-5 text-green-600" />,
        title: "New event: Campus Cleanup",
        time: "2d",
      },
      {
        id: "n4",
        icon: <Heart className="w-5 h-5 text-pink-500" />,
        title: "Ethan liked your post",
        time: "3d",
      },
      {
        id: "n5",
        icon: <Bell className="w-5 h-5 text-indigo-500" />,
        title: "Club announcement: Meeting moved",
        time: "4d",
      },
    ],
  },
  {
    id: 3,
    category: "Earlier",
    items: [
      {
        id: "n6",
        icon: <Heart className="w-5 h-5 text-pink-500" />,
        title: "Isabella liked your post",
        time: "1w",
      },
      {
        id: "n7",
        icon: <CalendarDays className="w-5 h-5 text-green-600" />,
        title: "Event update: Guest speaker added",
        time: "2w",
      },
    ],
  },
];

export default function Alerts() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    setNotifications(sampleNotifications);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900 text-center tracking-tight">
          Notifications
        </h1>
        <Bell className="text-gray-600" />
      </div>

      {/* Notifications List */}
      <div className="px-5 py-6 space-y-8">
        {notifications.map((section) => (
          <div key={section.id}>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.items.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition rounded-xl p-3 shadow-sm"
                >
                  <div className="p-2 bg-white rounded-full border">
                    {notif.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm font-medium">{notif.title}</p>
                    <p className="text-gray-500 text-xs">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
