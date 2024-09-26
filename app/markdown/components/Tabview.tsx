"use client";
import { useEffect, useState } from "react";
import TitleBar from "@/app/components/TitleBar";
import LinearLoader from "@/utils/Loader"; 
import TextEditor from "./TextEditor";

const MarkDownTabView = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 2 seconds
        }, 2000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <main className="w-full bg-white dark:bg-neutral-800 overflow-x-hidden">
            <section className="w-full flex items-start">
                <section className="w-full">
                    {isLoading ? (
                        // Show LinearLoader while loading
                        <div className="flex justify-center items-center min-h-screen px-32">
                            <LinearLoader />
                        </div>
                    ) : (
                        <>
                            <TitleBar title="Untitled Markdown" />
                            <TextEditor />
                        </>
                    )}
                </section>
            </section>
        </main>
    );
};

export default MarkDownTabView;
