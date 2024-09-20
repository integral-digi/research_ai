"use client";
import { useEffect, useState } from "react";
import TitleBar from "@/app/components/TitleBar";
import ChatBody from "./ChatBody";
import { data } from "@/utils/data";
import LinearLoader from "@/utils/Loader";

const ChatTabView = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 2000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <main className="w-full bg-white dark:bg-neutral-800 min-h-screen">
            <section className="w-full flex items-start">
                <section className="w-full">
                    {isLoading ? (
                        // Show LinearLoader while loading
                        <div className="flex justify-center items-center min-h-screen px-32">
                            <LinearLoader />
                        </div>
                    ) : (
                        <>
                            {/* Render the TitleBar and ChatBody after loading */}
                            <TitleBar title={data.chatData.title} />
                            <ChatBody id="" />
                        </>
                    )}
                </section>
            </section>
        </main>
    );
};

export default ChatTabView;
