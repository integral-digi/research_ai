"use client";
import {
  ArrowLeftIcon,
  Bars3Icon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useTabs } from "@/context/TabContext";
import AccDropdown from "./AccDropDown";
import FeatureCard from "./FeatureBox";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import { data } from "@/utils/data";
import SearchField from "./SearchField";
import AddFolder from "./AddFolder";

const MenuBar: React.FC<{ setIsLeftPanelVisible: React.Dispatch<React.SetStateAction<boolean>>, isLeftPanelVisible: boolean }> = ({ setIsLeftPanelVisible, isLeftPanelVisible }) => {
  const { tabs, activeTabId, addNewTab, closeTab, setActiveTabId } = useTabs();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev); // Toggle the search field
  };

  // Function to switch to the previous tab
  const switchToPrevTab = () => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    if (activeTabIndex > 0) {
      setActiveTabId(tabs[activeTabIndex - 1].id); // Switch to the previous tab using its id
    }
  };

  return (
    <section className="relative w-full h-24 bg-slate-100 dark:bg-zinc-900 flex items-center justify-between px-8 py-2">
      {/* Left Menu Section */}
      <section className="flex gap-x-6 items-center text-gray-700 dark:text-white">
        <img
          src="/assets/research-logo.svg"
          alt="logo"
          className="w-auto h-6 cursor-pointer md:hidden"
          onClick={() => router.push("/")}
        />
        <img
          src="/assets/research-icon.svg"
          alt="logo"
          className="w-auto h-6 cursor-pointer hidden md:block"
          onClick={() => router.push("/")}
        />
        <section className="flex items-center space-x-4 lg:hidden">
          <MagnifyingGlassIcon className="w-4 h-4 cursor-pointer" onClick={handleSearchToggle} />
          <HeartIcon className="w-4 h-4 cursor-pointer" />
          <AddFolder />
          <Bars3Icon
            className="w-4 h-4 cursor-pointer"
            onClick={() => setIsLeftPanelVisible((prev) => !prev)} // Toggle LeftPanel visibility
          />
          {showSearch && (
            <div className="h-full min-h-screen absolute top-24 left-0 bg-slate-100 dark:bg-zinc-900 p-4 w-72 z-50">
              <SearchField />
            </div>
          )}
        </section>
        <button
          className="lg:hidden bg-white dark:bg-neutral-800 h-12 w-12 md:h-8 md:w-8 rounded-full hover:bg-white/30 hover:dark:bg-neutral-800/30 flex items-center justify-center"
          onClick={switchToPrevTab}
        >
          <ArrowLeftIcon className="w-5 h-5 md:h-3 md:w-3 text-gray-700 dark:text-white" />
        </button>
      </section>

      {/* Tabs Section */}
      <div className="-mb-5 flex items-center overflow-x-auto space-x-4 p-1 w-1/2 scrollbar-hide">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex flex-grow max-w-[100px] w-fit px-4 py-2 items-center text-sm leading-5 text-gray-700 dark:text-white ${
              activeTabId === tab.id
                ? "bg-white dark:bg-neutral-800 font-bold rounded-t-xl h-20"
                : "bg-white rounded-full dark:bg-neutral-800 h-12"
            } cursor-pointer`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <Tooltip title={tab.title} className="font-medium" arrow>
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-white font-medium text-sm text-nowrap">
                  {tab.title.length > 4 ? `${tab.title.slice(0, 4)}...` : tab.title}
                </span>
                <button
                  className="w-fit"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent activating the tab on close button click
                    closeTab(tab.id);
                  }}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </Tooltip>
          </div>
        ))}
      </div>

      {/* Add New Tab Button */}
      <button
        className="md:h-8 md:w-8 bg-white dark:bg-neutral-800 h-12 w-12 rounded-full hover:bg-white/30 hover:dark:bg-neutral-800/30 flex items-center justify-center"
        onClick={() => addNewTab(`Tab ${tabs.length + 1}`, <FeatureCard />)}
      >
        <PlusIcon className="w-5 h-5 md:h-3 md:w-3 text-gray-700 dark:text-white" />
      </button>

      {/* Right Menu Section */}
      <section className="flex space-x-4">
        <ChatBubbleOvalLeftIcon
          className="w-6 h-6 cursor-pointer text-gray-700 dark:text-white md:hidden"
          onClick={() => router.push("/chat")}
        />
        <Popover className="relative h-fit">
          <PopoverButton className="w-fit">
            <section className="h-6 w-6 rounded-full">
              <img
                src={data.user.avatar}
                className="w-full h-full object-cover rounded-full"
                alt={data.user.username}
              />
            </section>
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
            <PopoverPanel className="absolute right-0 mt-2 z-20">
              <AccDropdown />
            </PopoverPanel>
          </Transition>
        </Popover>
      </section>
    </section>
  );
};

export default MenuBar;
