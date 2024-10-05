"use client"
import { data } from "@/utils/data";
import LeftPanel from "../components/LeftPanel";
import MenuBar from "../components/MenuBar";
import ChatBody from "./components/ChatBody";
import TitleBar from "../components/TitleBar";
import { useState } from "react";
import ChatView from "./components/ChatView";

const ChatHome = () => {
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true); // State to control LeftPanel visibility

  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      {/* MenuBar */}
      <section className="top-0 w-full">
        <MenuBar setIsLeftPanelVisible={setIsLeftPanelVisible} isLeftPanelVisible={isLeftPanelVisible} />
      </section>
      <section className="tab-panel w-full flex items-start">
        {/* LeftPanel Menu */}
        <section className={`w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900 ${!isLeftPanelVisible ? 'hidden' : ''} lg:hidden`}>
          <LeftPanel isVisible={isLeftPanelVisible} />
        </section>
        {/* TabPanels: Houses the content for each Tab */}
        <section className="w-[80%] flex justify-center items-center lg:w-full">
          <section className="w-full gap-y-16">
            {/* First Tab Panel: Displays ChatBody */}
            <TitleBar title="Chats" />
            <ChatView />
          </section>
        </section>
      </section>
    </main>
  );
};

export default ChatHome;
