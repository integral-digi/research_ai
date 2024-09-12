"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface TabData {
  id: number;
  title: string;
  content: React.ReactNode; 
}

interface TabContextProps {
  tabs: TabData[];
  activeTabIndex: number;
  addNewTab: (title: string, content: string) => void; 
  closeTab: (id: number) => void;
  setActiveTabIndex: (index: number) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
};

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Add a new tab with title and content
  const addNewTab = (title: string, content: string) => {
    const newTabId = tabs.length;
    const newTab = { id: newTabId, title, content };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabIndex(newTabId);
  };

  // Close an existing tab
  const closeTab = (id: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    // Adjust active tab index
    if (id === activeTabIndex && updatedTabs.length > 0) {
      setActiveTabIndex(Math.max(0, activeTabIndex - 1));
    } else if (id < activeTabIndex) {
      setActiveTabIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <TabContext.Provider value={{ tabs, activeTabIndex, addNewTab, closeTab, setActiveTabIndex }}>
      {children}
    </TabContext.Provider>
  );
};
