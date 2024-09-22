"use client";
import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import Cookies from 'js-cookie';

interface ViewContextProps {
	isGrid: boolean;
	toggleViewMode: () => void;
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

const ViewContext = createContext<ViewContextProps | undefined>(undefined);

export const ViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isGrid, setIsGrid] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Load initial view mode from cookie
	useEffect(() => {
		const savedViewMode = Cookies.get('homeViewMode');
		if (savedViewMode) {
			setIsGrid(savedViewMode === 'grid');
		}
	}, []);

	// Toggle view mode and store it in cookie
	const toggleViewMode = () => {
		setIsGrid((prev) => {
			const newViewMode = !prev ? 'grid' : 'list';
			Cookies.set('homeViewMode', newViewMode, { expires: 7 });
			return !prev;
		});
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<ViewContext.Provider
			value={{
				isGrid,
				toggleViewMode,
				isModalOpen,
				openModal,
				closeModal,
			}}
		>
			{children}
		</ViewContext.Provider>
	);
};

export const useView = () => {
	const context = useContext(ViewContext);
	if (!context) {
		throw new Error('useView must be used within a ViewProvider');
	}
	return context;
};
