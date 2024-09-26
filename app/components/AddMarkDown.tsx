"use client";
import { useNavTreeContext } from "@/context/TreeContext";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const AddDocument: React.FC = () => {
  const { setShowNewDocumentInput } = useNavTreeContext();

  const handleAddDocument = () => {
    setShowNewDocumentInput(true); // Opens the input for adding new document
  };

  return (
    <DocumentPlusIcon 
        className="w-4 h-4 text-gray-700 dark:text-white cursor-pointer" 
        onClick={handleAddDocument} 
    />
  );
};

export default AddDocument;
