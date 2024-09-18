"use client";
import { useNavTreeContext } from "@/context/TreeContext";
import { FolderIcon } from "@heroicons/react/24/outline";

const AddFolder: React.FC = () => {
  const { setShowNewFolderInput } = useNavTreeContext();

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
