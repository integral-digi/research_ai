"use client";
import { useTabs } from "@/context/TabContext";
import { createElement, ReactNode } from "react";

const Channel: React.FC = () => {
  const { tabs, activeTabId } = useTabs();

  // Find the currently active tab
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      {/* Render the active tab content */}
      {activeTab ? (
        typeof activeTab.content === "function"
          ? createElement(activeTab.content)
          : (activeTab.content as ReactNode)
      ) : (
        <p className="font-medium text-xl text-center">
            No active tab selected
        </p>
      )}
    </div>
  );
};

export default Channel;
