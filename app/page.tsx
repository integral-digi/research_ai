"use client";
import { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import MenuBar from "./components/MenuBar";
import Channel from "./components/Channel";
import MobileMenuBar from "./components/MobileMenu";

const Home = () => {
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true); // State to control LeftPanel visibility

  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      {/* Top Section containing the MenuBar */}
      <section className="top-0 w-full h-24 lg:hidden">
        <MenuBar setIsLeftPanelVisible={setIsLeftPanelVisible} isLeftPanelVisible={isLeftPanelVisible} />
      </section>
      <section className="top-0 w-full hidden lg:block">
        <MobileMenuBar />
      </section>
      {/* Main Content Section */}
      <section className="w-full flex items-start">
        {/* Left Sidebar */}
        <section className={`w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900 ${!isLeftPanelVisible ? 'hidden' : ''} lg:hidden`}>
          <LeftPanel isVisible={isLeftPanelVisible} />
        </section>

        {/* Right Content Section where TabPanels are displayed */}
        <section className={`relative lg:w-full ${isLeftPanelVisible ? "w-[80%]" : "w-full"}`}>
          <Channel />
        </section>
      </section>
    </main>
  );
};

export default Home;
