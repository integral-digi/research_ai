"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { data } from "@/utils/data";
import { useTabs } from "@/context/TabContext";
import NewMarkDown from "./NewMarkDown";
import { XMarkIcon } from "@heroicons/react/24/outline";

const featureInfo = {
  title: "Welcome to Research AI",
  subtitle: "Explore these Quick Actions to get started",
};

const FeatureCard = () => {
  const { addNewTab } = useTabs();
  const [isOpen, setIsOpen] = useState(false); // State to handle modal
  const [currentFeature, setCurrentFeature] = useState<any>(null);

  // Function to open modal
  const openModal = (feature: any) => {
    setCurrentFeature(feature);
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
    setCurrentFeature(null);
  };

  // Function to handle opening a new tab
  const openTab = (feature: any) => {
    addNewTab(feature.title, feature.href); 
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 p-8 md:p-12">
      {/* Title Section */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-black text-gray-700 dark:text-white">
          {featureInfo.title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-white font-medium">
          {featureInfo.subtitle}
        </p>
      </section>

      {/* Features Section */}
      <section className="space-y-8 px-24">
        {data.features.map((feature) => (
          <div
            key={feature.id}
            className="w-full p-4 md:p-6 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-zinc-900 flex items-center hover:shadow-xl cursor-pointer transition-shadow"
            onClick={() => {
              if (feature.id === 1) {
                openModal(feature); // Open modal for feature where id === 1
              } else {
                openTab(feature);  // Open as a tab 
              }
            }}
          >
            {/* Feature Icon and Title */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-neutral-800 rounded-md">
                <SquaresPlusIcon className="text-gray-700 dark:text-white w-6 h-6" />
              </div>
              <p className="text-lg text-gray-700 dark:text-white font-medium">
                {feature.title}
              </p>
            </div>
            {/* Arrow Icon */}
            <ArrowRightIcon className="ml-auto w-6 h-6 text-gray-500" />
          </div>
        ))}
      </section>

      {/* Modal for NewMarkDown */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-xl space-y-10 p-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all">
                  <section className="flex items-center justify-between">
                    <DialogTitle as="h3" className="text-lg font-medium text-gray-900 dark:text-white">
                      {currentFeature?.title}
                    </DialogTitle>
                    <button
                      type="button"
                      className="w-fit bg-transparent transition"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                    </button>
                  </section>
                  <div className="mt-4">
                    <NewMarkDown />
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FeatureCard;
