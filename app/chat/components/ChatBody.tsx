"use client"
import ChatInput from "./ChatInput";
import { data } from "@/utils/data";
import { DocumentDuplicateIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { memo, useCallback } from "react";

const ChatBody = ({ id }: { id: string }) => {
  return (
    <div className="w-full h-full border-l border-gray-400 border-opacity-20 relative">
      <div className="w-full h-full pt-8 px-8 pb-4 space-y-8">
        {data?.chatData?.conversation?.map((chat) => (
          <ChatBubble key={chat.id} role={chat.role} message={chat.message} />
        ))}
        {data?.chatData?.isTyping && (
          <div className="w-fit shadow-sm rounded-2xl p-4">
            <img
              src="/assets/loading.svg"
              alt="typing"
              className="w-8 h-auto animate-bounce"
            />
          </div>
        )}
      </div>
      <div className="w-full sticky bottom-0 bg-white dark:bg-neutral-800">
        <ChatInput />
      </div>
    </div>
  );
};

const ChatBubble = memo(
  ({ role, message }: { role: string; message: string }) => {
    const isUser = role === "user";

    const handleCopyToClipboard = useCallback(() => {
      navigator.clipboard.writeText(message).then(() => {
        alert("Message copied to clipboard!");
      });
    }, [message]);

    return (
      <div className="w-full" 
      >
        <div className={`w-[90%] lg:w-[60%] ${
        isUser ? "ml-auto bg-white dark:bg-neutral-800" : "mr-auto bg-slate-100 dark:bg-zinc-900"
        } border border-slate-300 dark:border-gray-700 rounded-2xl p-4 shadow-sm clear-both`}>
            <p className="text-base font-normal text-gray-700 dark:text-white">
                {message}
            </p>
        </div>
    
        {role === "chatbot" && (
          <div className="px-4 w-[90%] lg:w-[60%]">
            <div className="w-full flex items-baseline justify-between space-x-2">
              <section className="rounded-lg bg-white dark:bg-neutral-800 p-2">
                <img
                    src="/assets/research-icon.svg"
                    alt="Research logo"
                    className="w-6 h-6"
                />
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
      </div>
    );
  }
);

export default ChatBody;
