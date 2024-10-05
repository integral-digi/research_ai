"use client";
import { useState } from "react";
import { Checkbox, PopoverButton, Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/solid";
import ChooseModel from "./ModelSelection";
import { useChatContext } from "@/context/ChatContext";

const RightPanel = () => {
  const { chatData, createNewChat, setActiveChatId } = useChatContext(); 
  const [checkedChats, setCheckedChats] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle creating a new chat
  const handleNewChat = () => {
    const newChatId = chatData.length + 1;
    const newChat = {
      id: newChatId,
      title: `Untitled Chat`,
      isTyping: false,
      lastSeen: new Date().toLocaleString(),
      conversation: [],
      isActive: true,
      unreadCount: 0,
    };

    // Add the new chat to the context
    createNewChat();
    setActiveChatId(newChatId); // Set the new chat as active
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header */}
      <section className="w-full space-y-4">
        <section className="flex justify-between items-center">
          <PopoverButton>
            <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-white" />
          </PopoverButton>
          <section className="space-x-6 flex items-center justify-end w-full">
            {/* Cog icon to open modal */}
            <Cog6ToothIcon
              className="text-gray-700 dark:text-white w-5 h-5 cursor-pointer"
              onClick={() => setIsModalOpen(true)} 
            />
            <button className="bg-zinc-900 dark:bg-white px-3 h-8 rounded-md">
              <p className="text-white dark:text-gray-700 font-medium text-base">
                Share
              </p>
            </button>
          </section>
        </section>

        <hr className="border border-slate-300 w-full" />
        <section className="w-full space-y-4">
          {/* Chat History Header */}
          <section className="flex justify-between items-center">
            <section className="w-fit space-x-2 flex items-center">
              <p className="text-sm text-gray-500 font-medium">Chat History</p>
              <section className="text-gray-700 text-xs font-bold bg-slate-100 rounded py-1 px-2 w-fit">
                {chatData.length}
              </section>
            </section>
            <TrashIcon className="w-4 h-4 text-gray-700 dark:text-white" />
          </section>

          {/* Chat Items */}
          <section className="space-y-4">
            {chatData.map((chat) => (
              <section
                key={chat.id}
                className="cursor-pointer"
                onClick={() => setActiveChatId(chat.id)} // Set active chat using context
              >
                <PopoverButton className="flex items-start space-x-4 py-2">
                  <Checkbox
                    checked={checkedChats.includes(chat.id)}
                    onChange={() =>
                      setCheckedChats((prev) =>
                        prev.includes(chat.id)
                          ? prev.filter((id) => id !== chat.id)
                          : [...prev, chat.id]
                      )
                    }
                    className="group size-6 rounded-md dark:bg-white/10 p-1 ring-2 ring-slate-300 ring-inset"
                  >
                    <CheckIcon className="hidden size-4 fill-zinc-900 dark:fill-white group-data-[checked]:block" />
                  </Checkbox>

                  <section className="space-y-2 text-left">
                    <p className="text-zinc-900 dark:text-white text-base font-medium">
                      {chat.title}
                    </p>
                    <p className="text-gray-700 dark:text-white text-xs font-normal">
                      {chat.conversation?.[0]?.message.slice(0, 48) || "No messages"}...
                    </p>
                    <section className="flex justify-between items-center">
                      {chat.isActive && (
                        <span className="bg-green-500 rounded-full w-2 h-2" aria-label="Active chat" />
                      )}
                      <p className="text-xs font-normal text-gray-400 ml-4">{chat.lastSeen}</p>
                    </section>
                  </section>
                </PopoverButton>
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* New Chat Button */}
      <button
        className="w-full bottom-12 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center space-x-2 h-12 mx-auto"
        onClick={handleNewChat}
      >
        <PlusIcon className="dark:text-gray-700 text-white w-4 h-4" />
        <p className="text-white dark:text-gray-700 font-medium text-base">New Chat</p>
      </button>

      {/* Modal Implementation */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-lg bg-white dark:bg-zinc-800 p-8 space-y-12">
            <section className="flex items-center justify-between">
              <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">
                Chat Settings
              </DialogTitle>
              <button
                className="w-fit"
                onClick={() => setIsModalOpen(false)}
              >
                <XMarkIcon className="text-gray-700 dark:text-white w-5 h-5" />
              </button>
            </section>
            <ChooseModel />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default RightPanel;
