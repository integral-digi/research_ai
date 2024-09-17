"use client";
import { ArrowRightIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, Fragment, createElement } from "react";
import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { data } from "@/utils/data";
import NewMarkDown from "./NewMarkDown";
import { useTabs } from "@/context/TabContext"; 

const featureInfo = {
  title: "Welcome to Research AI",
  subtitle: "Explore these Quick Actions to get started",
};

const FeatureCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addNewTab } = useTabs(); // Get the tab context

  // Function to handle feature card clicks
  const handleTabClick = (id: number, feature: any) => {
    if (id === 1) {
      setIsModalOpen(true); // Open the modal 
    } else {
      // Add a new tab with the feature title and content
      addNewTab(feature.title, feature.content ? createElement(feature.content) : <NewMarkDown />);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <section className="max-w-3xl py-24 mx-auto space-y-12 md:p-12">
        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-black text-gray-700 dark:text-white">
            {featureInfo.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-white font-medium">
            {featureInfo.subtitle}
          </p>
        </section>
        <section className="space-y-8 px-24">
          {data.features.map((feature) => (
            <div
              key={feature.id}
              className={`w-full p-4 md:p-6 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-zinc-900 flex items-center hover:shadow-xl cursor-pointer transition-shadow`}
              onClick={() => handleTabClick(feature.id, feature)}
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
            </div>
          ))}
        </section>
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
                <DialogPanel className="w-full max-w-xl space-y-10 p-12 bg-white dark:bg-neutral-800 rounded-lg shadow-xl transform transition-all">
                  <section className="flex items-center justify-between">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium text-gray-900 dark:text-white"
                    >
                      New Markdown Editor
                    </DialogTitle>
                    <XMarkIcon
                      className="text-gray-700 dark:text-white w-5 h-5 cursor-pointer"
                      onClick={closeModal}
                    />
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