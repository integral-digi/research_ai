import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import TagBar from "./TagBar";
import { Fragment } from "react";

interface TitleProps {
    title: string;
}

const handleClick = () => {
    console.log("I've been clicked")
}

const TitleBar:React.FC<TitleProps> = ( {title} ) => {
    return (
        <div className="z-30 w-full h-[4.5rem] bg-white dark:bg-neutral-800 shadow-3xl flex items-center relative">
            <div className="w-full">
                <div className="w-full flex items-center justify-between px-8">
                    <section className="space-x-16 flex items-center">
                        <section className="flex items-center space-x-3">
                            <ArrowLeftIcon className="text-gray-700 dark:text-white w-5 h-5" />
                            <ArrowRightIcon className="text-gray-700 dark:text-white w-5 h-5" />
                        </section>
                        <section className="w-fit">
                            <Popover>
                                <PopoverButton className="text-lg font-medium text-gray-700 dark:text-white">
                                    {title}
                                </PopoverButton>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <PopoverPanel className="absolute mt-0 w-full left-0 right-0 z-50">
                                        <TagBar />
                                    </PopoverPanel>
                                </Transition>
                            </Popover>
                        </section>
                    </section>
                    <section className="flex items-center space-x-4">
                        <BookmarkIcon className="text-gray-700 dark:text-white w-4 h-4" onClick={handleClick} />
                        <TrashIcon className="text-gray-700 dark:text-white w-4 h-4" onClick={handleClick} />
                        <EllipsisVerticalIcon className="text-gray-700 dark:text-white w-4 h-4" onClick={handleClick} />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default TitleBar;