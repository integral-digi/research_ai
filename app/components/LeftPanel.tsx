"use client";
import { ChevronUpDownIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import NavTree from "./NavTree";
import { useModal } from "@/context/ModalProvider";
import { data } from "@/utils/data";

const LeftPanel = () => {
    const { toggleModal } = useModal();

    return (
        <div className="bg-slate-100 dark:bg-zinc-900 h-max min-h-screen bottom-0">
            <NavTree />
            <section className="space-y-4">
                <hr className="w-full bg-slate-300 dark:border-gray-700" />
                <section className="flex items-center justify-between px-8 pb-4">
                    <section className="flex items-center space-x-4">
                        <ChevronUpDownIcon className="text-gray-700 dark:text-white w-4 h-4" />
                        <p className="text-gray-700 dark:text-white text-base font-medium">
                            {data.user.vault[0].name}
                        </p>
                    </section>
                    <section className="space-x-2 flex items-center">
                        <QuestionMarkCircleIcon className="text-gray-700 dark:text-white w-4 h-4" />
                        <Cog6ToothIcon
                            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer"
                            onClick={() => toggleModal(true)} 
                        />
                    </section>
                </section>
            </section>
        </div>
    );
};

export default LeftPanel;
