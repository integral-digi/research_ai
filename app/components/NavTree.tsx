"use client";
import { useNavTreeContext } from "@/context/TreeContext";
import CustomTreeItem from "./CustomTreeItem";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useTabs } from "@/context/TabContext";
import TextEditor from "../markdown/components/TextEditor";
import CanvasTabView from "../canvas/components/TabView";
import TimelineTabView from "../timeline/components/TabView";
import PDFTabView from "../pdf-viewer/components/TabView";
import MarkDownTabView from "../markdown/components/Tabview";

const NavTree = () => {
  const { 
    treeData, 
    addNewItem,
    newFolderName, 
    setNewFolderName, 
    showNewFolderInput, 
    setShowNewFolderInput,
    newDocumentName,
    setNewDocumentName,
    showNewDocumentInput,
    setShowNewDocumentInput
  } = useNavTreeContext();

  // Handle new folder submission
  const handleNewFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      addNewItem("root", {
        id: Date.now().toString(),
        label: newFolderName,
        fileType: "folder",
        children: [],
      });
      setNewFolderName("");
      setShowNewFolderInput(false);
    }
  };

  // Handle new document submission
  const handleNewDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDocumentName.trim()) {
      addNewItem("root", {
        id: Date.now().toString(),
        label: newDocumentName,
        fileType: "doc",
        children: [],
      });
      setNewDocumentName("");
      setShowNewDocumentInput(false);
    }
  };

  const { addNewTab } = useTabs(); 

  const handleTabClick = (node: any) => {
    // Prevent folder from opening a new tab
    if (node.fileType === "folder") {
      return;
    }
  
    // Check the file type and open the correct component
    switch (node.fileType) {
      case "image":
        addNewTab(node.label, <CanvasTabView />);
        break;
      case "pdf":
        addNewTab(node.label, <PDFTabView />);
        break;
      case "timeline":
        addNewTab(node.label, <TimelineTabView />);
        break;
      default:
        addNewTab(node.label, <MarkDownTabView />);
    }
  };
  

  const renderTreeItems = (nodes: any) => {
    return nodes.map((node: any) => (
      <CustomTreeItem
        key={node.id}
        id={node.id}
        label={node.label}
        fileType={node.fileType}
        onClick={() => handleTabClick(node)} // Handle click on tree item
      >
        {node.children && renderTreeItems(node.children)}
      </CustomTreeItem>
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4 overflow-y-auto bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-neutral-800 min-h-screen">
      <ul>
        <section className="w-full">
          {/* Render folder input */}
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

          {/* Render document input */}
          {showNewDocumentInput && (
            <form onSubmit={handleNewDocumentSubmit} className="ml-2 pb-2">
              <section className="relative">
                <input
                  type="text"
                  className="font-medium border border-slate-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-transparent text-gray-700 dark:text-white"
                  value={newDocumentName}
                  onChange={(e) => setNewDocumentName(e.target.value)}
                  autoFocus
                  onBlur={() => setShowNewDocumentInput(false)}
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