"use client";
import { data } from "@/utils/data"
import RightPanel from "../components/RightPanel"
import MenuBar from "../components/MenuBar"
import TitleBar from "../components/TitleBar"
import InfiniteCanvas from "./components/CanvasContainer"
import PDFViewer from "../components/PDFViewer"
import { useTabs } from "@/context/TabContext";
import { Tab, TabGroup, TabPanels, TabPanel } from '@headlessui/react';

const CanvasHome = () => {
  const { tabs, activeTabIndex, setActiveTabIndex } = useTabs();

  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full">
        <MenuBar />
      </section>
      <section className="w-full flex items-start">
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
          <RightPanel menuItems={data.items} />
        </section>
        <section className="w-[80%]">
          <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
            <TabPanels>
              {tabs.map((tab) => (
                <TabPanel key={tab.id} className="w-full">
                  <TitleBar title={data.chatData.title} />
                  <InfiniteCanvas />
                  {/* <PDFViewer fileUrl={"/assets/babycv.pdf"} /> */}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </section>
      </section>
    </main>
  );
};

export default CanvasHome;

