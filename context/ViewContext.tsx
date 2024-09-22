"use client"
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface ViewContextProps {
	isGrid: boolean;
	toggleViewMode: () => void;
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

const ViewContext = createContext<ViewContextProps | undefined>(undefined);

export const ViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isGrid, setIsGrid] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleViewMode = () => setIsGrid((prev) => !prev);
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
