import { ArrowsPointingInIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon, ArrowTurnDownRightIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, DocumentTextIcon, MinusIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";

const Panel = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="shadow-3xl h-12 flex items-center w-fit px-4 bg-slate-100 dark:bg-zinc-900 rounded-tl-xl rounded-bl-xl">
                <section className="flex items-center space-x-4">
                    <PhotoIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <DocumentTextIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <ArrowTurnDownRightIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                </section>
            </div>
            <div className="shadow-3xl h-12 bg-slate-100 dark:bg-zinc-900 px-4  rounded-tr-xl rounded-br-xl">
                <section className="flex items-center space-x-4 h-full">
                    <PlusIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <ArrowPathIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <MinusIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <ArrowsPointingInIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <ArrowUturnLeftIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <ArrowUturnRightIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <div className="border border-slate-400 h-full" />
                    <QuestionMarkCircleIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                    <Cog6ToothIcon className="text-gray-700 dark:text-white w-4 h-4"/>
                </section>
            </div>
        </div>
    )
}

export default Panel;