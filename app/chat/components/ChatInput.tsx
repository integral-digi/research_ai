"use client"
import { MicrophoneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    
    const handleSend = () => {
        if (message !== "") {
            setMessage("");
        }
    };
    
    return (
        <div className="message-input relative">
            <hr className="border-gray-400 border-opacity-20 w-full" />
            <div className="absolute right-4 top-4 flex items-center space-x-3 z-50">
                <section className="flex items-center space-x-3">
                    <PaperClipIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                    <MicrophoneIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                </section>
                <button onClick={handleSend} className= "bg-gray-950 rounded-md">
                    <p className="px-8 py-2 text-white text-sm font-secondary">
                        Send
                    </p>
                </button>
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="border-none w-full h-16 px-4 py-2 text-sm font-normal text-gray-700 dark:text-white focus:outline-none"
            />
        </div>
    );
};

export default ChatInput;
