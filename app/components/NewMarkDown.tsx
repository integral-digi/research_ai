"use client"
import { useState } from "react";

const NewMarkDown = () => {
    // State for title and content
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", { title, content });
    };

    return (
        <div className="max-w-xl mx-auto">
            <form className="w-full space-y-8 flex flex-col justify-start" onSubmit={handleSubmit}>
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 font-medium text-base" htmlFor="title">
                        Title
                    </label>
                    <input 
                        className="w-full font-normal border border-slate-300 text-gray-700 rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        id="title"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </section>              
                <section className="space-y-2 flex flex-col justify-start">
                    <label className="text-left text-gray-500 font-medium text-base" htmlFor="content">
                        Content
                    </label>
                    <textarea 
                        className="w-full font-normal text-gray-700 h-32 border border-slate-300 rounded-lg p-2 focus:ring focus:ring-gray-300" 
                        id="content"
                        placeholder="Write your note"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </section>
                <button 
                    type="submit" 
                    className="w-32 py-2 mt-8 font-bold bg-gray-950 text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default NewMarkDown;
