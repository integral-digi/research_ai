"use client"
import { useNavTreeContext } from "@/context/TreeContext";
import CustomTreeItem from "./CustomTreeItem";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const NavTree = () => {
  const { 
    treeData, 
    addNewItem,
    newFolderName, 
    showNewFolderInput, 
    setNewFolderName, 
    setShowNewFolderInput 
  } = useNavTreeContext();

  const handleNewFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New folder name:", newFolderName); // Debug log
    if (newFolderName.trim()) {
      addNewItem("root", {
        id: Date.now().toString(),
        label: newFolderName,
        fileType: "folder",
        children: [],
      });
      setNewFolderName("");
      setShowNewFolderInput(false);
    } else {
      console.log("Folder name is empty, not adding."); // Debug log
    }
  };

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
        <section className="w-full">
          {showNewFolderInput && (
            <form onSubmit={handleNewFolderSubmit} className="ml-2 pb-2">
              <section className="relative">
                <input
                  type="text"
                  className="font-medium border border-slate-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-transparent text-gray-700 dark:text-white"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                  onBlur={() => setShowNewFolderInput(false)}
                />
                <button type="submit" className="w-fit absolute right-2 top-2">
                  <ArrowRightIcon className="w-4 h-4 text-gray-700 dark:text-white" />
                </button>
              </section>
            </form>
          )}
        </section>

        {renderTreeItems(treeData)}
      </ul>
    </div>
  );
};

export default NavTree;