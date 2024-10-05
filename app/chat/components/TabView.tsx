"use client"
import { Fragment, useEffect, useState } from "react";
import TitleBar from "@/app/components/TitleBar";
import ChatView from "./ChatView";
import LinearLoader from "@/utils/Loader";
import { useChatContext } from "@/context/ChatContext";
import { Popover, PopoverButton, Transition, PopoverPanel } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import RightPanel from "./RightPanel";

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
  const { chatData, activeChatId } = useChatContext(); 
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update activeChat whenever activeChatId changes
  useEffect(() => {
    const selectedChat = chatData.find((chat) => chat.id === activeChatId);
    setActiveChat(selectedChat || null);
  }, [activeChatId, chatData]);

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
          {activeChat ? (
            <>
              {/* Render the TitleBar with the active chat's title */}
              <TitleBar title={activeChat.title || "Untitled Chat"} />
              {/* Pass the active chat and handler to ChatView */}
              <ChatView />
            </>
          ) : (
            <section className="w-full flex justify-center items-center min-h-screen">
              <p className="text-gray-700 dark:text-white font-medium">
                No active chat. Please select or start a new chat.
              </p>
              <Popover>
                <PopoverButton className="bg-white dark:bg-zinc-900 shadow-3xl rounded-full p-4 fixed bottom-32 right-8 z-50">
                  <InformationCircleIcon className="text-gray-700 dark:text-white w-5 h-5" />
                </PopoverButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel className="fixed h-full w-[30%] lg:w-full top-0 bottom-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-3xl p-12">
                    <RightPanel /> 
                  </PopoverPanel>
                </Transition>
              </Popover>
            </section>
          )}
        </section>
      </section>
    </main>
  );
};

export default ChatTabView;
