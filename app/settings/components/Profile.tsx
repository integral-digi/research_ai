"use client"
import { data } from "@/utils/data";
import { useState } from "react";

const EditProfile = () => {
    const [username, setUsername] = useState(data.user.username); 
    const [email, setEmail] = useState(data.user.email); 

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Form submitted with:", { username, email });
    };

    return (
        <div>
            <form className="w-full space-y-8 flex flex-col justify-start" onSubmit={handleSubmit}>
                    <section className="w-24 h-24">
                        <img 
                            src={data.user.avatar} 
                            alt={data.user.username} 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </section>
                {/* Username field */}
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 dark:text-white font-medium text-base" htmlFor="username">
                        Username
                    </label>
                    <input 
                        className="w-full font-normal px-4 border border-slate-300 dark:border-gray-700 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        id="username"
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </section>

                {/* Email field */}
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 dark:text-white font-medium text-base" htmlFor="email">
                        Email Address
                    </label>
                    <input 
                        className="w-full font-normal px-4 text-gray-700 dark:text-white border border-slate-300 dark:border-gray-700 bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </section>

                {/* Submit button */}
                <button type="submit" className="w-fit px-4 h-10 font-bold bg-zinc-900 dark:bg-white dark:text-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
                    Save Changes 
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
