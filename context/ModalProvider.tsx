"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
    isOpen: boolean;
    openSettingsModal: () => void;
    closeSettingsModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeSettingsModal = () => setIsOpen(false);
    const openSettingsModal = () => setIsOpen(true);

    return (
        <ModalContext.Provider value={{ isOpen, openSettingsModal, closeSettingsModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
