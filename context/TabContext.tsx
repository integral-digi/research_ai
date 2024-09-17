"use client"
import FeatureCard from "@/app/components/FeatureBox";
import { createContext, useContext, useState } from "react";

interface TabData {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface TabContextProps {
  tabs: TabData[];
  activeTabId: number | null;
  addNewTab: (title: string, content: React.ReactNode) => void;
  closeTab: (id: number) => void;
  setActiveTabId: (id: number) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
};

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<TabData[]>([{ id: 1, title: "New Tab", content: <FeatureCard /> }]);
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const addNewTab = (title: string, content: React.ReactNode) => {
    const newTabId = Date.now(); // Generate unique ID based on timestamp
    setTabs((prevTabs) => [...prevTabs, { id: newTabId, title, content }]);
    setActiveTabId(newTabId); // Set the new tab as active
  };

  const closeTab = (id: number) => {
    setTabs((prevTabs) => prevTabs.filter(tab => tab.id !== id));
    // Automatically switch to another tab if the active one is closed
    if (activeTabId === id && tabs.length > 1) {
      setActiveTabId(tabs[0].id);
    }
  };

  return (
    <TabContext.Provider value={{ tabs, activeTabId, addNewTab, closeTab, setActiveTabId }}>
      {children}
    </TabContext.Provider>
  );
};
