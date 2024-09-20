"use client";
import React, { useState, useEffect } from "react";
import TitleBar from "@/app/components/TitleBar";
import CustomGanttTimeline from "./CalendarTimeline";
import LinearLoader from "@/utils/Loader";

const TimelineTabView = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full bg-white dark:bg-neutral-800 min-h-screen">
      <section className="w-full flex items-start">
        <section className="w-full top-0 min-h-screen">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen px-32">
              <LinearLoader /> 
            </div>
          ) : (
            <>
              <TitleBar title="September Schedule" />
              <CustomGanttTimeline />
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default TimelineTabView;
