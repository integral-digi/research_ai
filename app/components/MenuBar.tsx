"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { ArrowLeftIcon, Bars3Icon, ChatBubbleOvalLeftIcon, FolderIcon, HeartIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { data } from '@/utils/data';
import { useTabs } from '@/context/TabContext';  
import AccDropdown from './AccDropDown';

const MenuBar: React.FC = () => {
  const { tabs, activeTabIndex, addNewTab, closeTab, setActiveTabIndex } = useTabs();
  const router = useRouter();

  // Function to switch to the previous tab
  const switchToPrevTab = () => {
    if (activeTabIndex > 0) {
      setActiveTabIndex(activeTabIndex - 1);
    }
  };

  return (
    <section className="w-full h-24 bg-slate-100 dark:bg-zinc-900 flex items-center justify-between px-8 py-2">
      {/* Left Menu Section */}
      <section className="flex space-x-6 items-center text-gray-700 dark:text-white">
        <img 
          src="/assets/research-logo.svg" 
          alt="logo" 
          className="w-auto h-6 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <section className="flex items-center space-x-4">
          <MagnifyingGlassIcon className="w-4 h-4 cursor-pointer" />
          <HeartIcon className="w-4 h-4 cursor-pointer" />
          <FolderIcon className="w-4 h-4 cursor-pointer" />
          <Bars3Icon className="w-4 h-4 cursor-pointer" />
        </section>
        <button
          className="bg-white dark:bg-neutral-800 h-12 w-12 rounded-full hover:bg-neutral-100 flex items-center justify-center"
          onClick={switchToPrevTab}
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
      </section>

      {/* Tabs Section */}
      <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
        <TabList className="flex items-center overflow-x-auto space-x-4 p-1 w-full max-w-3xl scrollbar-hide">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `flex-grow min-w-[100px] px-4 py-2 items-center text-sm leading-5 text-gray-700 dark:text-white  ${
                  selected ? "bg-white dark:bg-neutral-800 font-bold rounded-t-lg h-20" : "bg-white rounded-full dark:bg-zinc-900 h-12"
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <span className='text-gray-700 dark:text-white font-medium text-sm text-nowrap'>{tab.title}</span>
                <button
                  className="w-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </Tab>
          ))}
        </TabList>
      </TabGroup>
        {/* Add New Tab Button */}
        <button
          className="bg-white dark:bg-neutral-800 h-12 w-12 rounded-full hover:bg-neutral-100 flex items-center justify-center"
          onClick={() => addNewTab("New Tab", "Content for the new tab")} // Pass default title and content
        >
          <PlusIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>

      {/* Right Menu Section */}
      <section className="flex space-x-4">
        <ChatBubbleOvalLeftIcon className="w-6 h-6 cursor-pointer text-gray-700 dark:text-white" onClick={() => router.push("/chat")} />
        <Popover className="relative h-fit xl:hidden">
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
