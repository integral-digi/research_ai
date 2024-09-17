"use client";
import TitleBar from "../components/TitleBar"
import RightPanel from "../components/RightPanel";
import MenuBar from "../components/MenuBar";
import CustomGanttTimeline from "./components/CalendarTimeline"

const TimeLineHome = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full">
        <MenuBar />
      </section>
      <section className="w-full flex items-start">
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
          <RightPanel /> 
        </section>
        <section className="w-[80%]">
          <TitleBar title="My Timeline" />
          <CustomGanttTimeline />
        </section>
      </section>
    </main>
  );
};

export default TimeLineHome;
