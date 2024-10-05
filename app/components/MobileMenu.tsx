"use client";
import {
	ArrowLeftIcon,
	MagnifyingGlassIcon,
	PlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useTabs } from "@/context/TabContext";
import FeatureCard from "./FeatureBox";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import { data } from "@/utils/data";
import SearchField from "./SearchField";
import AccDropdown from "./AccDropDown";

const MobileMenuBar: React.FC = () => {
	const { tabs, activeTabId, addNewTab, closeTab, setActiveTabId } = useTabs();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	const handleSearchToggle = () => {
		setShowSearch((prev) => !prev);
	};

	const handleTabSwitch = (direction: 'prev' | 'next') => {
		const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTabId);
		const newTabIndex = direction === 'prev' 
			? activeTabIndex - 1 
			: activeTabIndex + 1;
		if (newTabIndex >= 0 && newTabIndex < tabs.length) {
			setActiveTabId(tabs[newTabIndex].id);
		}
	};

	return (
		<section className="relative w-full h-16 bg-slate-100 dark:bg-zinc-900 flex items-center justify-between px-4 py-2">
			{/* Left Section */}
			<section className="flex items-center space-x-4 text-gray-700 dark:text-white">
				<ArrowLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => handleTabSwitch('prev')} />
				<MagnifyingGlassIcon
					className="w-6 h-6 cursor-pointer"
					onClick={handleSearchToggle}
				/>
				{showSearch && (
					<div className="absolute top-16 left-0 w-full bg-slate-100 dark:bg-zinc-900 p-4 z-50">
						<SearchField />
					</div>
				)}
			</section>

			{/* Scrollable Tab Section */}
			<div className="flex-1 flex items-center justify-center overflow-x-auto space-x-2 scrollbar-hide">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						className={`flex items-center justify-center px-3 py-1 text-sm rounded-full ${
							activeTabId === tab.id ? "bg-white dark:bg-neutral-800 font-bold" : "bg-slate-200 dark:bg-neutral-900"
						} cursor-pointer`}
						onClick={() => setActiveTabId(tab.id)}
					>
						<Tooltip title={tab.title} arrow>
							<span className="text-gray-700 dark:text-white truncate">
								{tab.title.length > 8 ? `${tab.title.slice(0, 8)}...` : tab.title}
							</span>
						</Tooltip>
						<button onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}>
							<XMarkIcon className="w-4 h-4 ml-2 text-gray-700 dark:text-white" />
						</button>
					</div>
				))}
			</div>

			{/* Add Tab and User Avatar */}
			<section className="flex items-center space-x-4">
				<PlusIcon className="w-6 h-6 cursor-pointer" onClick={() => addNewTab(`Tab ${tabs.length + 1}`, <FeatureCard />)} />
				<Popover>
					<PopoverButton>
						<img
							src={data.user.avatar}
							className="w-6 h-6 rounded-full cursor-pointer"
							alt={data.user.username}
						/>
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

export default MobileMenuBar;
