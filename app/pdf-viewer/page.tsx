"use client";
import { useState } from "react";
import LeftPanel from "../components/LeftPanel";
import MenuBar from "../components/MenuBar";
import TitleBar from "../components/TitleBar";
import dynamic from "next/dynamic";

// Dynamically import the PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import('./components/PDFViewer'), {
  ssr: false,
});

// Function to extract the file name from the fileUrl
const extractFileName = (fileUrl: string): string => {
  const parts = fileUrl.split('/');
  return parts[parts.length - 1];  // Get the last part of the URL
};

const PDFHome = () => {
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true); // State to control LeftPanel visibility

  const fileUrl = "/assets/babycv.pdf"; 

  // Extract the file name from the fileUrl
  const fileName = extractFileName(fileUrl);

  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full h-24">
        <MenuBar setIsLeftPanelVisible={setIsLeftPanelVisible} isLeftPanelVisible={isLeftPanelVisible} />
      </section>
      <section className="w-full flex items-start">
        <section className={`w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900 ${!isLeftPanelVisible ? 'hidden' : ''} lg:hidden`}>
          <LeftPanel isVisible={isLeftPanelVisible} /> 
        </section>
        <section className="w-[80%]">
            {/* Use fileName extracted from the fileUrl as the title */}
            <TitleBar title={fileName} />
            <PDFViewer fileUrl={fileUrl} />
        </section>
      </section>
    </main>
  );
};

export default PDFHome;
