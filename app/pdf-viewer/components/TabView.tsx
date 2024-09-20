"use client";
import dynamic from "next/dynamic";
import TitleBar from "@/app/components/TitleBar";
import LinearLoader from "@/utils/Loader";
import { useEffect, useState } from "react";

// Function to extract the file name from the fileUrl
const extractFileName = (fileUrl: string): string => {
  const parts = fileUrl.split('/');
  return parts[parts.length - 1]; // Get the last part of the URL
};

// Dynamically import the PDFViewer component with no SSR
const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const PDFTabView = () => {
  const fileUrl = "/assets/babycv.pdf";
  
  // State to store the file name and loading state
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Extract the file name when the component mounts
  useEffect(() => {
    const name = extractFileName(fileUrl);
    setFileName(name);
  }, [fileUrl]);

  // Simulate a loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="w-full flex items-start">
        <section className="w-full">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen px-32">
              <LinearLoader />
            </div>
          ) : (
            <>
              {/* Use fileName extracted from the fileUrl as the title */}
              <TitleBar title={fileName} />
              <PDFViewer fileUrl={fileUrl} />
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default PDFTabView;
