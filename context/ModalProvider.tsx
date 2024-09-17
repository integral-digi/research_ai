"use client";
import { createContext, useContext, useState, ReactNode, FC } from "react";

interface ModalContextProps {
    isOpen: boolean;
    toggleModal: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (state: boolean) => setIsOpen(state);

    return (
        <ModalContext.Provider value={{ isOpen, toggleModal }}>
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
