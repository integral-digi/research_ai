import { data } from "@/utils/data";
import RightPanel from "../components/RightPanel";
import MenuBar from "../components/MenuBar";
import ChatBody from "./components/ChatBody";
import TitleBar from "../components/TitleBar";

const ChatHome = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      {/* MenuBar */}
      <section className="top-0 w-full">
        <MenuBar />
      </section>
      <section className="tab-panel w-full flex items-start">
        {/* RightPanel Menu */}
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
          <RightPanel />
        </section>
        {/* TabPanels: Houses the content for each Tab */}
        <section className="w-[80%] flex justify-center items-center">
          <section className="w-full gap-y-16">
            {/* First Tab Panel: Displays ChatBody */}
            <TitleBar title={data.chatData.title} />
            <ChatBody id="" />
          </section>
        </section>
      </section>
    </main>
  );
};

export default ChatHome;
