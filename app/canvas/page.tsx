"use client"
import { data } from "@/utils/data"
import LeftPanel from "../components/LeftPanel"
import MenuBar from "../components/MenuBar"
import TitleBar from "../components/TitleBar"
import InfiniteCanvas from "./components/CanvasContainer"
import { useState } from "react";

const CanvasHome = () => {
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true); // State to control LeftPanel visibility

  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full">
        <MenuBar setIsLeftPanelVisible={setIsLeftPanelVisible} isLeftPanelVisible={isLeftPanelVisible} />
      </section>
      <section className="w-full flex items-start">
      <section className={`w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900 ${!isLeftPanelVisible ? 'hidden' : ''} lg:hidden`}>
          <LeftPanel isVisible={isLeftPanelVisible} /> 
        </section>
        <section className="w-[80%] lg:w-full">
          <section className="w-full">
            <TitleBar title={data.chatData.title} />
            <InfiniteCanvas />
          </section>
        </section>
      </section>
    </main>
  );
};

export default CanvasHome;

