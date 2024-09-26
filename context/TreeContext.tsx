"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { data } from "@/utils/data";

// Define the file types
type FileType = "image" | "pdf" | "doc" | "video" | "folder" | "pinned" | "trash" | undefined;

interface TreeNode {
  id: string;
  label: string;
  fileType: FileType;
  children?: TreeNode[];
}

interface NavTreeContextType {
  treeData: TreeNode[];
  addNewItem: (parentId: string, newItem: TreeNode) => void;
  updateItemLabel: (id: string, newLabel: string) => void;
  removeItem: (id: string) => void;
  showNewFolderInput: boolean;
  setShowNewFolderInput: (value: boolean) => void;
  showNewDocumentInput: boolean;
  setShowNewDocumentInput: (value: boolean) => void;
  newFolderName: string;
  setNewFolderName: (value: string) => void;
  newDocumentName: string;
  setNewDocumentName: (value: string) => void;
}

// Map data utility function
const mapTreeData = (nodes: any[]): TreeNode[] => {
  return nodes.map((node) => ({
    id: node.id,
    label: node.label,
    fileType: node.fileType as FileType,
    children: node.children ? mapTreeData(node.children) : [],
  }));
};

const menuData: TreeNode[] = mapTreeData(data.items);

const NavTreeContext = createContext<NavTreeContextType | undefined>(undefined);

export const NavTreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(menuData);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [showNewDocumentInput, setShowNewDocumentInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newDocumentName, setNewDocumentName] = useState("");

  const addRecursively = useCallback((nodes: TreeNode[], parentId: string, newItem: TreeNode): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        return { ...node, children: [...(node.children || []), newItem] };
      } else if (node.children) {
        return { ...node, children: addRecursively(node.children, parentId, newItem) };
      }
      return node;
    });
  }, []);

  const addNewItem = (parentId: string, newItem: TreeNode) => {
    setTreeData((prev) => addRecursively(prev, parentId, newItem));
  };

  const updateItemLabel = (id: string, newLabel: string) => {
    const updateRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, label: newLabel };
        } else if (node.children) {
          return { ...node, children: updateRecursively(node.children) };
        }
        return node;
      });
    };
  
    setTreeData((prev) => updateRecursively(prev));
  };
  
  const removeItem = (id: string) => {
    const removeRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) {
            return { ...node, children: removeRecursively(node.children) };
          }
          return node;
        });
    };
  
    setTreeData((prev) => removeRecursively(prev));
  };
  

  return (
    <NavTreeContext.Provider
      value={{
        treeData,
        addNewItem,
        updateItemLabel,
        removeItem,
        showNewFolderInput,
        setShowNewFolderInput,
        showNewDocumentInput,
        setShowNewDocumentInput,
        newFolderName,
        setNewFolderName,
        newDocumentName,
        setNewDocumentName,
      }}
    >
      {children}
    </NavTreeContext.Provider>
  );
};

export const useNavTreeContext = () => {
  const context = useContext(NavTreeContext);
  if (!context) {
    throw new Error("useNavTreeContext must be used within a NavTreeProvider");
  }
  return context;
};
