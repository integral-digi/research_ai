import TitleBar from "@/app/components/TitleBar";
import CustomGanttTimeline from "./CalendarTimeline";

const TimelineTabView = () => {
    return (
        <main className="w-full bg-white dark:bg-neutral-800 min-h-screen">
            <section className="w-full flex items-start">
                <section className="w-full top-0 min-h-screen">
                    <TitleBar title="September Schedule" />
                    <CustomGanttTimeline />
                </section>
            </section>
        </main>
    )
}

export default TimelineTabView;