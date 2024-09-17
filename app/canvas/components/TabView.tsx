import TitleBar from "@/app/components/TitleBar";
import InfiniteCanvas from "./CanvasContainer";
import { data } from "@/utils/data";

const CanvasTabView = () => {
    return (
        <main className="w-full bg-white dark:bg-neutral-800 overflow-x-hidden">
        <section className="w-full flex items-start">
          <section className="w-full">
              <TitleBar title="Untitled Canvas" />
              <InfiniteCanvas />
          </section>
        </section>
      </main>
    )
}

export default CanvasTabView;