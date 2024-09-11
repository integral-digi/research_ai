import { data } from "@/utils/data"
import RightPanel from "../components/RightPanel"
import MenuBar from "../components/MenuBar"
import TitleBar from "../components/TitleBar"
import Container from "./components/Container"
import InfiniteCanvas from "./components/CanvasContainer"
import PDFViewer from "../components/PDFViewer"

const Home = () => {
  return (
    <div className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full">
            <MenuBar />
      </section>
      <section className="w-full flex items-start">
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
            <RightPanel menuItems={data.items} />
        </section>
        <section className="w-[80%] flex justify-center items-center">
            <section className="w-full gap-y-16">
                <TitleBar title={data.chatData.title} />
                {/* <InfiniteCanvas /> */}
                <PDFViewer fileUrl={"/assets/babycv.pdf"} />
            </section>
        </section>
      </section>
    </div>
  )
}

export default Home