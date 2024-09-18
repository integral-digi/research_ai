"use client";
import { data } from "@/utils/data"
import LeftPanel from "../components/LeftPanel"
import MenuBar from "../components/MenuBar"
import TitleBar from "../components/TitleBar"
import InfiniteCanvas from "./components/CanvasContainer"

const CanvasHome = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full">
        <MenuBar />
      </section>
      <section className="w-full flex items-start">
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
          <LeftPanel /> 
        </section>
        <section className="w-[80%]">
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

