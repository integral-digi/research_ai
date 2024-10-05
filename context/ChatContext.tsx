"use client"
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface Message {
  id: number;
  role: 'user' | 'chatbot';
  message: string;
  messageType: string;
  time: string;
  isRead: boolean;
}

interface Chat {
  id: number;
  title: string;
  isTyping: boolean;
  lastSeen: string;
  conversation: Message[];
  isActive: boolean;
  unreadCount: number;
}

interface ChatContextProps {
  chatData: Chat[];
  activeChatId: number | null;
  setActiveChatId: (id: number) => void;
  createNewChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now(), // Using timestamp as a unique ID
      title: "Untitled Chat",
      isTyping: false,
      lastSeen: new Date().toLocaleString(),
      conversation: [],
      isActive: true,
      unreadCount: 0,
    };
    setChatData((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
  };

  const value = useMemo(() => ({ chatData, activeChatId, setActiveChatId, createNewChat }), [chatData, activeChatId]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

