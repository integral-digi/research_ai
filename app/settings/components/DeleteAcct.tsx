"use client";
import { useState } from "react";

const DeleteAcct = () => {
    const [password, setPassword] = useState(""); 

    const warningText = "This action is irreversible, proceeding will permanently delete your account, licenses, and subscriptions.";

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Log the password for now (in a real app, this is where the delete logic would go)
        console.log("Form submitted with password:", password);
    };

    return (
        <div className="space-y-12">
            <p className="text-gray-700 dark:text-white text-left font-medium text-base">
                {warningText}
            </p>
            <form className="w-full space-y-8 flex flex-col justify-start" onSubmit={handleSubmit}>
                {/* Password field */}
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 dark:text-white font-medium text-base" htmlFor="password">
                        Enter Password
                    </label>
                    <input
                        className="w-full font-normal px-4 text-gray-700 dark:text-white border border-slate-300 bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300"
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} // Update the password state
                        required
                    />
                </section>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-fit px-4 h-10 font-bold bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Delete Account
                </button>
            </form>
        </div>
    );
};

export default DeleteAcct;
