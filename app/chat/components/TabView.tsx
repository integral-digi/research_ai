import TitleBar from "@/app/components/TitleBar";
import ChatBody from "./ChatBody";
import { data } from "@/utils/data";

const ChatTabView = () => {
    return (
        <main className="w-full bg-white dark:bg-neutral-800 min-h-screen">
            <section className="w-full flex items-start">
            <section className="w-full">
                <TitleBar title={data.chatData.title} />
                <ChatBody id="" />
            </section>
            </section>
        </main>
    )
}

export default ChatTabView;