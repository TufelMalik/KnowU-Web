import React, { useState, useRef, useEffect } from "react";
import {
  MicrophoneIcon,
  PlusIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import OptionsMenu from "./OptionsMenu"; // Make sure you have this component created

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const inputRef = useRef(null);
  const audioChunksRef = useRef([]);

  const isTyping = message.trim() !== "";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    // Text message sending
    if (!message.trim()) return;
    onSend({
      id: Date.now(),
      text: message.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "/assets/user/user1.jpg",
    });
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices) return alert("Microphone not supported");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new window.MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);

        onSend({
          id: Date.now(),
          text: "[Voice Message]",
          audio: audioUrl,
          sender: "me",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          avatar: "/assets/user/user1.jpg",
        });
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      alert("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="relative bg-white border-t border-gray-200 shadow-inner p-3 z-50">
      <div className="flex items-center space-x-2">
        {/* Mic button */}
        {!isTyping && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full flex items-center justify-center ${
              isRecording ? "bg-red-500" : "bg-[#097ABE]"
            }`}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={isRecording}
          >
            <MicrophoneIcon className="w-5 h-5 text-white" />
          </motion.button>
        )}

        {/* Input box */}
        <div className="flex items-center flex-1 bg-gray-100 rounded-2xl px-3 py-2 border border-gray-300 focus-within:border-blue-500 transition-all duration-200">
          {isTyping && (
            <img
              src="/assets/user/user1.jpg"
              alt="me"
              className="w-7 h-7 rounded-full mr-2 object-cover"
            />
          )}
          <textarea
            ref={inputRef}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent resize-none outline-none text-sm px-1"
            style={{ minHeight: "24px", maxHeight: "100px", overflowY: "auto" }}
          />
          {!isTyping && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 rounded-full text-gray-500 hover:text-blue-500"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowOptions(false);
              }}
            >
              <FaceSmileIcon className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Plus / Options menu button */}
        {!isTyping && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full flex items-center justify-center bg-[#097ABE]"
            onClick={() => {
              setShowOptions(!showOptions);
              setShowEmojiPicker(false);
            }}
          >
            <PlusIcon className="w-5 h-5 text-white" />
          </motion.button>
        )}

        {/* Send button */}
        {isTyping && (
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full flex items-center justify-center bg-[#097ABE]"
          >
            <PaperAirplaneIcon className="w-5 h-5 text-white -rotate-45" />
          </motion.button>
        )}
      </div>

      {/* Options menu */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-14 right-0 z-50"
          >
            <OptionsMenu
              isOpen={showOptions}
              onSelect={(opt) => {
                // Implement your option handling logic here
                setShowOptions(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <>
            <motion.div
              key="emoji-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              key="emoji-picker"
              initial={{ x: 300, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 300, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="fixed right-4 bottom-20 z-50 w-80 h-96 bg-white rounded-2xl shadow-xl overflow-auto border border-gray-200"
            >
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                emojiStyle="apple"
                theme="light"
                width="100%"
                height="100%"
                previewConfig={{ showPreview: false }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInput;
