"use client";
import RightPanel from "./components/RightPanel";
import MenuBar from "./components/MenuBar";
import Channel from "./components/Channel";

const Home = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      {/* Top Section containing the MenuBar */}
      <section className="top-0 w-full h-24">
        <MenuBar />
      </section>

      {/* Main Content Section */}
      <section className="w-full flex items-start">
        {/* Left Sidebar */}
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
          <RightPanel />
        </section>

        {/* Right Content Section where TabPanels are displayed */}
        <section className="w-[80%] relative">
          <Channel />
        </section>
      </section>
    </main>
  );
};

export default Home;
