"use client"
import { data } from "@/utils/data";
import { useState } from "react";

const Security = () => {
    const [password, setPassword] = useState(""); 
    const [email, setEmail] = useState(""); 

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Form submitted with:", { password, email });
    };

    function setNewPass(value: string): void {
        throw new Error("Function not implemented.");
    }

    function setConfirmNewPass(value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <form className="w-full space-y-8 flex flex-col justify-start" onSubmit={handleSubmit}>
                {/* Password field */}
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 dark:text-white font-medium text-base" htmlFor="password">
                        Old Password
                    </label>
                    <input 
                        className="w-full font-normal px-4 border border-slate-300 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        type="password"
                        id="password"
                        placeholder="Enter a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </section>

                {/* New Password field */}
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 dark:text-white font-medium text-base" htmlFor="email">
                        New Password
                    </label>
                    <input 
                        className="w-full font-normal px-4 text-gray-700 dark:text-white border border-slate-300 bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        type="password"
                        id="newpassword"
                        placeholder="New Password"
                        value={email}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                    />
                </section>
                {/* Confirm Password Field */}
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 dark:text-white font-medium text-base" htmlFor="email">
                        Confirm New Password
                    </label>
                    <input 
                        className="w-full font-normal px-4 text-gray-700 dark:text-white border border-slate-300 bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        type="password"
                        id="confirmnpassword"
                        placeholder="Confirm Password"
                        value={email}
                        onChange={(e) => setConfirmNewPass(e.target.value)}
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

export default Security;
