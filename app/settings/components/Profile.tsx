"use client"
import { data } from "@/utils/data";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";

const EditProfile = () => {
    const [username, setUsername] = useState(data.user.username); 
    const [email, setEmail] = useState(data.user.email); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatar, setAvatar] = useState(data.user.avatar); 
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    // Handle avatar upload (open file explorer)
    const handleAvatarUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input click
        }
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (file) {
            const reader = new FileReader();

            // FileReader API to read file content
            reader.onload = (event) => {
                if (event.target?.result) {
                    setAvatar(event.target.result as string); 
                }
            };

            reader.readAsDataURL(file); 
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setIsSubmitting(true);

        // Simulating form submission delay
        setTimeout(() => {
            console.log("Form submitted with:", { username, email });
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="p-4 w-full">
            <form className="space-y-8 flex flex-col justify-start" onSubmit={handleSubmit}>
                {/* Avatar Section */}
                <section className="relative w-24 h-24">
                    <img 
                        src={avatar} 
                        alt={username} 
                        className="w-full h-full object-cover rounded-full" 
                    />
                    <button 
                        type="button" 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 absolute bottom-0 right-0"
                        onClick={handleAvatarUpload}
                        aria-label="Upload avatar"
                    >
                        <CameraIcon className="w-4 h-4 text-gray-700 dark:text-white" />
                    </button>

                    {/* Hidden file input for image upload */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                    />
                </section>

                {/* Username field */}
                <section className="space-y-2">
                    <label className="text-gray-500 dark:text-white font-medium text-base" htmlFor="username">
                        Username
                    </label>
                    <input 
                        className="w-full px-4 py-2 font-medium text-gray-700 dark:text-white bg-transparent border border-slate-300 dark:border-gray-700 rounded-lg focus:ring focus:ring-gray-300" 
                        id="username"
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </section>

                {/* Email field */}
                <section className="space-y-2">
                    <label className="text-gray-500 dark:text-white font-medium text-base" htmlFor="email">
                        Email Address
                    </label>
                    <input 
                        className="w-full px-4 py-2 font-medium text-gray-700 dark:text-white bg-transparent border border-slate-300 dark:border-gray-700 rounded-lg focus:ring focus:ring-gray-300" 
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </section>

                {/* Submit button */}
                <button 
                    type="submit" 
                    className={`px-4 h-10 font-bold text-white rounded-lg transition ${isSubmitting ? 'bg-gray-500' : 'bg-zinc-900 dark:bg-white dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-200'}`}
                    disabled={isSubmitting} 
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
