import { useEffect, useState } from "react";
import TitleBar from "@/app/components/TitleBar";
import ChatView from "./ChatView";
import { data } from "@/utils/data";
import LinearLoader from "@/utils/Loader";

// Define the type for the chat object
interface Chat {
  id: number;
  title: string;
  isTyping: boolean;
  lastSeen: string;
  conversation: {
    id: number;
    role: string;
    message: string;
    messageType: string;
    time: string;
    isRead: boolean;
  }[];
  isActive: boolean;
  unreadCount: number;
}

const ChatTabView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<Chat | null>(data.chatData[0] || null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handler to update active chat when a new one is selected
  const handleSelectChat = (chatId: number) => {
    const selectedChat = data.chatData.find((chat) => chat.id === chatId);
    setActiveChat(selectedChat || null);
  };

  if (isLoading) {
    return (
      <main className="w-full bg-white dark:bg-neutral-800 min-h-screen">
        <div className="flex justify-center items-center min-h-screen px-32">
          <LinearLoader />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full h-full bg-white dark:bg-neutral-800 min-h-screen">
      <section className="w-full flex items-start">
        <section className="w-full">
          {activeChat && (
            <>
              {/* Render the TitleBar with the active chat's title */}
              <TitleBar title={activeChat.title} />
              {/* Pass the handler to ChatView */}
              <ChatView onSelectChat={handleSelectChat} />
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default ChatTabView;
