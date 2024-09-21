"use client";
import ChatInput from "./ChatInput";
import { memo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DocumentDuplicateIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { data } from "@/utils/data"; 

interface ChatMessage {
  id: number;
  role: string;
  message: string;
  messageType: string;
  time: string;
  isRead: boolean;
}

interface ChatBodyProps {
  chat: {
    id: number;
    title: string;
    isTyping: boolean;
    lastSeen: string;
    conversation: ChatMessage[];
    isActive: boolean;
    unreadCount: number;
  };
}

const ChatBody = ({ chat }: ChatBodyProps) => {
  return (
    <div className="w-full h-screen border-l border-gray-400 border-opacity-20 relative">
      <div className="w-full h-fit pt-8 px-8 pb-48 space-y-8">
        {chat.conversation.map((chatMessage) => (
          <ChatBubble key={chatMessage.id} role={chatMessage.role} message={chatMessage.message} id={0} messageType={""} time={""} isRead={false} />
        ))}
        {chat.isTyping && (
          <div className="w-fit shadow-sm rounded-2xl p-4">
            <img
              src="/assets/loading.svg"
              alt="typing"
              className="w-8 h-auto animate-bounce"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="w-full fixed bottom-0 bg-white dark:bg-neutral-800 py-8">
        <section className="sticky w-[79%] lg:w-full">
          <ChatInput />
        </section>
      </div>
    </div>
  );
};

// ChatBubble Component
const ChatBubble = memo(({ role, message }: ChatMessage) => {
  const isUser = role === "user";
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Auto-close snackbar
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="w-full h-fit space-y-0">
      <div
        className={`w-[90%] lg:w-[75%] ${
          isUser ? "ml-auto bg-white dark:bg-neutral-800" : "mr-auto bg-slate-100 dark:bg-zinc-900"
        } border border-slate-300 dark:border-gray-700 rounded-2xl p-4 shadow-sm clear-both`}
      >
        <p className="text-base font-normal text-gray-700 dark:text-white">{message}</p>
      </div>

      {role === "chatbot" && (
        <div className="px-4 w-[90%] lg:w-[75%]">
          <div className="w-full flex items-baseline justify-between space-x-2">
            <section className="rounded-lg p-2">
              <img src="/assets/research-icon.svg" alt="Research logo" className="w-6 h-6" loading="lazy" />
            </section>
            <section className="flex items-center space-x-4">
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center justify-center h-6 px-2 bg-slate-100 dark:bg-zinc-900 rounded-md"
                aria-label="Copy message to clipboard"
              >
                <DocumentDuplicateIcon className="w-4 h-4 text-gray-700 dark:text-white" />
              </button>
              <button
                className="px-2 bg-slate-100 dark:bg-zinc-900 rounded-md flex items-center justify-center h-6 font-medium text-xs text-gray-700 dark:text-white"
                aria-label="Regenerate response"
              >
                Regenerate
              </button>
              <EllipsisVerticalIcon className="w-4 h-4 text-gray-700 dark:text-white" />
            </section>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          <p className="font-medium">Message copied to clipboard!</p>
        </Alert>
      </Snackbar>
    </div>
  );
});

ChatBubble.displayName = "ChatBubble";

export default ChatBody;
