"use client";
import Toggler from "@/app/components/Toggler";
import { QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { useView } from "@/context/ViewContext";

const Appearance = () => {
	const { isGrid, toggleViewMode } = useView(); 

	return (
		<div className="space-y-8">
			{/* Dark Mode Toggle */}
			<section className="flex items-center justify-between">
				<p className="text-gray-700 dark:text-white text-base font-medium">Toggle Dark Mode</p>
				<Toggler />
			</section>

			{/* Home Style Toggle */}
			<section className="flex items-center justify-between">
				<p className="text-gray-700 dark:text-white text-base font-medium">
                    Home Style
                    </p>
				<section className="rounded-md h-12 bg-slate-100 dark:bg-zinc-900/30 flex items-center">
					{/* List View Button */}
					<button
						className={`px-4 h-full flex items-center justify-center rounded-md transition-colors ${
							!isGrid ? "bg-slate-200 dark:bg-zinc-700" : "bg-transparent"
						}`}
						onClick={toggleViewMode}
					>
						<QueueListIcon className="w-6 h-6 text-gray-700 dark:text-white" />
					</button>

					{/* Grid View Button */}
					<button
						className={`px-4 h-full flex items-center justify-center rounded-md transition-colors ${
							isGrid ? "bg-slate-200 dark:bg-zinc-700" : "bg-transparent"
						}`}
						onClick={toggleViewMode}
					>
						<Squares2X2Icon className="w-6 h-6 text-gray-700 dark:text-white" />
					</button>
				</section>
			</section>
		</div>
	);
};

export default Appearance;
