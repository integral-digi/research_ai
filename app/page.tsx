import { data } from "@/utils/data"
import RightPanel from "./components/RightPanel"
import MenuBar from "./components/MenuBar"
import FeatureCard from "./components/FeatureBox"

const Home = () => {
  return (
    <main className="w-full bg-white dark:bg-neutral-800">
      <section className="top-0 w-full">
        <MenuBar />
      </section>
      <section className="w-full flex items-start">
        <section className="w-[20%] min-h-screen bg-slate-100 dark:bg-zinc-900">
          <RightPanel menuItems={data.items} />
        </section>
        <section className="w-[80%] flex justify-center items-center mt-8">
          <FeatureCard />
        </section>
      </section>
    </main>
  )
}

export default Home