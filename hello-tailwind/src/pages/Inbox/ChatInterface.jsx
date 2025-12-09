import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

const ChatInterface = () => {
  const { chatName } = useParams();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "other", time: "10:15 AM", avatar: "/assets/user/user2.jpg" },
  ]);

  const handleSend = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "/assets/user/user1.jpg",
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col justify-between">
      <ChatHeader chatName={chatName} />
      <ChatContent messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatInterface;
