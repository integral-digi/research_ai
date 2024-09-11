import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";

interface TitleProps {
    title: string;
}

const TitleBar:React.FC<TitleProps> = ( {title} ) => {
    return (
        <div className="w-full h-[4.5rem] bg-white dark:bg-neutral-800 shadow-3xl flex items-center">
            <div className="w-full">
                <div className="w-full flex items-center justify-between px-8">
                    <section className="space-x-16 flex items-center">
                        <section className="flex items-center space-x-3">
                            <ArrowLeftIcon className="text-gray-700 dark:text-white w-5 h-5" />
                            <ArrowRightIcon className="text-gray-700 dark:text-white w-5 h-5" />
                        </section>
                        <section className="w-fit">
                            <p className="text-lg font-medium text-gray-700 dark:text-white">
                                {title}
                            </p>
                        </section>
                    </section>
                    <section className="flex items-center space-x-4">
                        <BookmarkIcon className="text-gray-700 dark:text-white w-4 h-4" />
                        <TrashIcon className="text-gray-700 dark:text-white w-4 h-4" />
                        <EllipsisVerticalIcon className="text-gray-700 dark:text-white w-4 h-4" />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default TitleBar;