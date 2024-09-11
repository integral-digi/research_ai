"use client"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ArrowLeftIcon, Bars3Icon, HeartIcon, FolderIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AccDropdown from './AccDropDown';
import Home from '../page';

interface TabData {
  id: number;
  title: string;
}

const MenuBar: React.FC = () => {
  const [tabs, setTabs] = useState<TabData[]>([{ id: 0, title: 'Home' }]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const router = useRouter();

  // Function to add a new tab with the Home component
  const addNewTab = () => {
    const newTabId = tabs.length;
    const newTab = { id: newTabId, title: `Tab ${newTabId + 1}` };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabIndex(newTabId);
  };

  // Function to close a tab
  const closeTab = (id: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    // Adjust the activeTabIndex correctly after removing the tab
    if (id === activeTabIndex && updatedTabs.length > 0) {
      setActiveTabIndex(Math.max(0, activeTabIndex - 1));
    } else if (id < activeTabIndex) {
      setActiveTabIndex((prevIndex) => prevIndex - 1);
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
      </section>

      {/* Tabs Section */}
      <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
        <TabList className="flex overflow-x-auto space-x-4 p-1 w-full max-w-3xl scrollbar-hide">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `flex-grow min-w-[100px] px-4 py-2 text-sm leading-5 text-gray-700 dark:text-white rounded-t-lg ${
                  selected ? "bg-white dark:bg-neutral-800 font-bold" : "bg-slate-100 dark:bg-zinc-900"
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <span className='text-gray-700 dark:text-white font-medium text-sm'>{tab.title}</span>
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
        
        {/* Add new tab button */}
        <button
          className="bg-white dark:bg-neutral-800 h-12 w-12 rounded-full hover:bg-neutral-100 flex items-center justify-center"
          onClick={addNewTab}
        >
          <PlusIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>

        {/* Tab Panels */}
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id}>
              {/* Render the Home component inside every new tab */}
              <Home />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </section>
  );
};

export default MenuBar;
