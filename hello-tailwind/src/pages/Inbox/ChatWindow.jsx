// src/components/ChatWindow.jsx
import React, { useState } from "react";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat content should take all remaining space and be scrollable */}
      <div className="flex-1 overflow-y-auto">
        <ChatContent messages={messages} />
      </div>

      {/* Input stays fixed at bottom */}
      <div className="border-t">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatWindow;
