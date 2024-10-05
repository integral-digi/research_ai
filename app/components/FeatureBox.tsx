"use client";
import { ArrowRightIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, createElement } from "react";
import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { data } from "@/utils/data";
import NewMarkDown from "./NewNote";
import { useTabs } from "@/context/TabContext";
import { useView } from "@/context/ViewContext";
import { motion } from "framer-motion";

const featureInfo = {
    title: "Welcome to Research AI",
    subtitle: "Explore these Quick Actions to get started",
};

const FeatureCard = () => {
    const { addNewTab } = useTabs();
    const { isGrid, isModalOpen, openModal, closeModal } = useView();

    const handleTabClick = (id: number, feature: any) => {
        if (id === 1) {
            openModal(); // Open the modal
        } else {
            // Add a new tab with the feature title and content
            addNewTab(feature.title, feature.content ? createElement(feature.content) : <NewMarkDown />);
        }
    };

    return (
        <div className="w-full">
            <section className="max-w-4xl p-12 mx-auto space-y-12 lg:p-8 flex flex-col justify-center">
                <section className="space-y-6 text-center">
                    <h2 className="text-3xl font-black text-gray-700 dark:text-white">
                        {featureInfo.title}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-white font-medium">
                        {featureInfo.subtitle}
                    </p>
                </section>

                {isGrid ? (
                    <section className="gap-4 w-full flex flex-wrap">
                        {data.features.map((feature) => (
                            <motion.div
                                key={feature.id}
                                className="flex flex-col justify-between w-60 h-60 md:w-full p-6 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-zinc-900/80 hover:shadow-xl cursor-pointer"
                                onClick={() => handleTabClick(feature.id, feature)}
                                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            >
                                <section className="space-y-6">
                                    <div className="p-4 bg-blue-100 dark:bg-neutral-800 rounded-md w-fit">
                                        <section className="w-5 h-5 text-gray-700 dark:text-white">
                                            {createElement(feature.image || SquaresPlusIcon)}
                                        </section>
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-white font-medium">
                                        {feature.title}
                                    </p>
                                </section>
                                <ArrowRightIcon className="ml-auto w-4 h-4 text-gray-500" />
                            </motion.div>
                        ))}
                    </section>
                ) : (
                    <section className="space-y-8 px-24 lg:px-0">
                        {data.features.map((feature) => (
                            <motion.div
                                key={feature.id}
                                className="w-full p-4 md:p-6 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-zinc-900/80 flex items-center hover:shadow-xl cursor-pointer transition-shadow"
                                onClick={() => handleTabClick(feature.id, feature)}
                                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-blue-100 dark:bg-neutral-800 rounded-md">
                                        <section className="w-5 h-5 text-gray-700 dark:text-white">
                                            {createElement(feature.image || SquaresPlusIcon)}
                                        </section>
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-white font-medium">
                                        {feature.title}
                                    </p>
                                </div>
                                <ArrowRightIcon className="ml-auto w-6 h-6 text-gray-500" />
                            </motion.div>
                        ))}
                    </section>
                )}
            </section>

            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-xl p-12 bg-white dark:bg-neutral-800 rounded-lg shadow-xl">
                                    <section className="flex items-center justify-between">
                                        <DialogTitle as="h3" className="text-lg font-medium text-gray-900 dark:text-white">
                                            New Note
                                        </DialogTitle>
                                        <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-white cursor-pointer" onClick={closeModal} />
                                    </section>
                                    <div className="mt-4">
                                        <NewMarkDown />
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default FeatureCard;
