"use client";
import { useNavTreeContext } from "@/context/TreeContext";
import { ArrowRightIcon, FolderIcon } from "@heroicons/react/24/outline";
import React from "react";

const AddFolder: React.FC = () => {
  const {
    addNewItem,
    showNewFolderInput,
    setShowNewFolderInput,
    newFolderName,
    setNewFolderName,
  } = useNavTreeContext();

  const handleAddFolder = () => {
    setShowNewFolderInput(true);
  };

  return (
    <FolderIcon 
        className="w-4 h-4 text-gray-700 dark:text-white cursor-pointer" 
        onClick={handleAddFolder} 
    />
  );
};

export default AddFolder;
