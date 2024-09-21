"use client";
import { Fragment, useState } from "react";
import RightPanel from "./RightPanel";
import ChatBody from "./ChatBody";
import { data } from "@/utils/data";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface ChatViewProps {
  onSelectChat: (chatId: number) => void;
}

const ChatView = ({ onSelectChat }: ChatViewProps) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  // Handler for selecting a chat
  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
    onSelectChat(chatId);
  };

  // Handler for adding a new chat
  const handleNewChat = (chat: { id: number; title: string }) => {
    // Automatically select the new chat
    setSelectedChatId(chat.id);
  };

  const selectedChat = selectedChatId !== null ? data.chatData.find((chat) => chat.id === selectedChatId) : null;

  return (
    <div className="flex w-full h-full relative">
        {/* Right panel for chat history and selection */}
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
                    <RightPanel onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
                </PopoverPanel>
            </Transition>
        </Popover>

        {/* Chat body displaying selected chat */}
        <div className="w-full flex justify-center items-center">
            {selectedChat ? (
                <ChatBody chat={selectedChat} />
            ) : (
                <div className="flex justify-center h-full p-48">
                    <p className="text-gray-500 font-medium text-center">Select a chat to view the conversation</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ChatView;
