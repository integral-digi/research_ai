"use client"
import { data } from "@/utils/data";
import { createContext, useContext, useState } from "react";

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
  removeItem: (id: string) => void;
  updateItemLabel: (id: string, newLabel: string) => void;
}

// Helper function to recursively map through data items
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

  const addNewItem = (parentId: string, newItem: TreeNode) => {
    const addRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newItem], 
          };
        }
        return node.children ? { ...node, children: addRecursively(node.children) } : node;
      });
    };

    setTreeData((prev) => addRecursively(prev));
  };

  const removeItem = (id: string) => {
    const removeRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .filter((node) => node.id !== id) // Remove item if ID matches
        .map((node) => {
          if (node.children) {
            return { ...node, children: removeRecursively(node.children) };
          }
          return node;
        });
    };

    setTreeData((prev) => removeRecursively(prev));
  };

  const updateItemLabel = (id: string, newLabel: string) => {
    const updateRecursively = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, label: newLabel }; 
        }
        return node.children ? { ...node, children: updateRecursively(node.children) } : node;
      });
    };

    setTreeData((prev) => updateRecursively(prev));
  };

  return (
    <NavTreeContext.Provider value={{ treeData, addNewItem, removeItem, updateItemLabel }}>
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
