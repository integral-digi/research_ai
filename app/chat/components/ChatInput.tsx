"use client";
import { MicrophoneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log("Selected file:", selectedFile);
        }
    };

    const handleSend = () => {
        if (message !== "" || file) {
            // Handle message or file sending logic here
            console.log("Message:", message);
            if (file) {
                console.log("File sent:", file);
                setFile(null); // Reset file after sending
            }
            setMessage("");
        }
    };

    // Trigger file input when PaperClipIcon is clicked
    const triggerFileInput = () => {
        document.getElementById("fileInput")?.click();
    };

    return (
        <div className="message-input relative px-8">
            <div className="absolute right-12 top-4 flex items-center space-x-3 z-50">
                <section className="flex items-center space-x-3">
                    <PaperClipIcon 
                        className="w-5 h-5 text-gray-700 dark:text-white cursor-pointer" 
                        onClick={triggerFileInput} 
                    />
                    <MicrophoneIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                </section>
                <button onClick={handleSend} className="bg-gray-950 dark:bg-white rounded-md">
                    <p className="px-8 py-2 text-white text-sm font-bold dark:text-gray-700">
                        Send
                    </p>
                </button>
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="dark:bg-neutral-800 border border-slate-300 rounded-lg w-full text-wrap h-16 px-4 py-2 text-base flex items-center font-normal text-gray-700 dark:text-white focus:outline-none"
            />
            {/* Hidden file input */}
            <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default ChatInput;
