"use client"
import { useNavTreeContext } from "@/context/TreeContext";
import CustomTreeItem from "./CustomTreeItem";

const NavTree = () => {
  const { treeData } = useNavTreeContext();

  const renderTreeItems = (nodes: any) => {
    return nodes.map((node: any) => (
      <CustomTreeItem
        key={node.id}
        id={node.id}
        label={node.label}
        fileType={node.fileType}
      >
        {node.children && renderTreeItems(node.children)}
      </CustomTreeItem>
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4 overflow-y-auto bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-neutral-800 min-h-screen">
      <ul>
        {renderTreeItems(treeData)}
      </ul>
    </div>
  );
};

export default NavTree;
