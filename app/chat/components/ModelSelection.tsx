"use client";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const samplePath = "C:/Users/HP/Downloads";

const ChooseModel = () => {
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [folderPath, setFolderPath] = useState<string>(samplePath);
    const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const selectModel = (modelName: string) => {
        setSelectedModel((prev) => (prev === modelName ? null : modelName));
    };

    const openFolderDialog = async () => {
        try {
            const handle = await window.showDirectoryPicker();
            setDirectoryHandle(handle);
            setFolderPath(handle.name);
        } catch (error) {
            console.error("Error selecting folder: ", error);
        }
    };

    const saveChatToFolder = async () => {
        if (!directoryHandle) return;

        try {
            const fileHandle = await directoryHandle.getFileHandle("chat.json", { create: true });
            const writable = await fileHandle.createWritable();
            const chatData = JSON.stringify({ chat: "Chat data goes here" }, null, 2);
            await writable.write(chatData);
            await writable.close();

            setAlertMessage("Chat saved to chat.json successfully!");
            setAlertOpen(true);
        } catch (error) {
            console.error("Error saving chat: ", error);
            setAlertMessage("Failed to save chat.");
            setAlertOpen(true);
        }
    };

    return (
        <div className="space-y-8 w-full">
            <div className="space-y-4 w-full">
                <label htmlFor="itemTitle" className="block text-base md:text-lg font-medium text-gray-700 dark:text-white">
                    Save Chat to
                </label>
                <div className="w-full lg:w-full relative">
                    <input
                        id="save-chat"
                        name="save-chat"
                        type="text"
                        value={folderPath}
                        placeholder="Select a folder"
                        readOnly
                        required
                        className="w-full px-3 h-12 bg-transparent border border-slate-300 dark:border-gray-700 text-gray-700 dark:text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        onClick={openFolderDialog}
                        className="h-9 px-6 bg-zinc-900 dark:bg-white rounded-md text-white dark:text-gray-700 font-medium text-base md:text-sm absolute top-1.5 right-2"
                        aria-label="Choose"
                    >
                        Choose
                    </button>
                </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-8">
                <label htmlFor="choose-model" className="block text-base font-medium text-gray-700 dark:text-gray-300">
                    Choose Model
                </label>
                <div className="flex items-center flex-wrap gap-4 mt-3">
                    {[
                        { id: 1, name: "Open AI", icon: "/assets/openai.svg" },
                        { id: 2, name: "Google", icon: "/assets/google.svg" },
                        { id: 3, name: "Anthropic", icon: "/assets/anthropic.svg" },
                    ].map((model) => (
                        <div
                            key={model.id}
                            className={`space-y-1 px-6 py-2 bg-transparent cursor-pointer font-medium dark:text-white text-gray-700 border border-gray-700 rounded-md ${
                                selectedModel === model.name
                                    ? "text-gray-700 border-4 border-slate-300 dark:text-white font-medium"
                                    : "hover:bg-slate-300 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => selectModel(model.name)}
                        >
                            <img src={model.icon} className="w-8 h-8" alt={model.name} />
                            <p>
                                {model.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Button to Save Chat */}
            <button
                onClick={saveChatToFolder}
                className="w-full mt-6 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center space-x-2 h-12 mx-auto"
            >
                <p className="text-white dark:text-gray-700 font-medium text-base">Save Changes</p>
            </button>

            {/* MUI Snackbar for Alerts */}
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity={alertMessage.includes("successfully") ? "success" : "error"}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ChooseModel;
