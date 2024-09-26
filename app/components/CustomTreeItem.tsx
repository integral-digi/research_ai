"use client";
import { ChevronRightIcon, FolderIcon, DocumentIcon, TrashIcon, VideoCameraIcon, PhotoIcon, BookmarkIcon, PlusIcon,} from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useNavTreeContext } from "@/context/TreeContext";
import { forwardRef, useState, KeyboardEvent } from "react";

const getIconFromFileType = (fileType?: string) => {
  switch (fileType) {
    case "image":
      return PhotoIcon;
    case "pdf":
    case "doc":
      return DocumentIcon;
    case "video":
      return VideoCameraIcon;
    case "folder":
      return FolderIcon;
    case "pinned":
      return BookmarkIcon;
    case "trash":
      return TrashIcon;
    default:
      return FolderIcon;
  }
};

const CustomTreeItem = forwardRef<HTMLLIElement, any>(
  ({ id, label, fileType, children, onClick, isEditable, ...other }, ref) => {
    const { addNewItem, updateItemLabel, removeItem } = useNavTreeContext();
    const expandable = !!children?.length;
    const Icon = getIconFromFileType(fileType);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLabel, setCurrentLabel] = useState(label);

    // Handle toggle for expandable folders
    const handleToggle = () => {
      if (fileType === "folder") {
        setIsExpanded((prev) => !prev);
      } else if (onClick) {
        onClick();  // Trigger the tab opening for non-folder items
      }
    };

    // Handle label click to enable editing
    const handleLabelClick = () => {
      if (isEditable) {
        setIsEditing(true);
      }
    };

    // Update label when the user finishes editing
    const handleBlur = () => {
      if (currentLabel.trim() !== label) {
        updateItemLabel(id, currentLabel);
      }
      setIsEditing(false);
    };

    // Handle input changes for editable labels
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLabel(e.target.value);
    };

    // Save the label when 'Enter' is pressed
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleBlur();
      }
    };

    // Handle adding new items (for folders)
    const handlePlusClick = () => {
      addNewItem(id, {
        id: Date.now().toString(),
        label: "New Item",
        fileType: "doc",
      });
    };

    // Handle item deletion
    const handleDeleteClick = () => {
      removeItem(id);
    };

    return (
      <li
        ref={ref}
        {...other}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={clsx(
            "flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800",
            expandable ? "cursor-pointer" : "cursor-default"
          )}
          onClick={handleToggle}  // Only toggle if it's a folder, otherwise trigger onClick for files
        >
          {isEditing ? (
            <input
              type="text"
              value={currentLabel}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-white dark:bg-neutral-800 text-gray-700 dark:text-white font-medium"
            />
          ) : (
            <div onDoubleClick={handleLabelClick}>
              <CustomLabel icon={Icon} expandable={expandable}>
                {currentLabel}
              </CustomLabel>
            </div>
          )}

          {expandable && (
            <ChevronRightIcon
              className={clsx(
                "w-5 h-5 ml-auto transition-transform text-gray-700 dark:text-white",
                isExpanded && "rotate-90"
              )}
            />
          )}

          {isHovered && (
            <>
              <PlusIcon
                className="w-5 h-5 text-gray-700 dark:text-white ml-auto cursor-pointer"
                onClick={handlePlusClick}
              />
              <TrashIcon
                className="w-5 h-5 text-gray-700 dark:text-white ml-2 cursor-pointer"
                onClick={handleDeleteClick}
              />
            </>
          )}
        </div>

        {expandable && (
          <Transition
            show={isExpanded}
            enter="transition ease-in duration-200"
            enterFrom="opacity-0 transform scale-95"
            enterTo="opacity-100 transform scale-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100 transform scale-100"
            leaveTo="opacity-0 transform scale-95"
          >
            <ul className="ml-6">{children}</ul>
          </Transition>
        )}
      </li>
    );
  }
);

CustomTreeItem.displayName = "CustomTreeItem";

const CustomLabel = ({ icon: Icon, expandable, children }: any) => (
  <div className="flex items-center space-x-4">
    {Icon && <Icon className="w-5 h-5 mr-2 text-gray-700 dark:text-white" />}
    <span className="text-gray-700 dark:text-white font-medium">
      {children}
    </span>
    {expandable && (
      <span className="inline-block w-2 h-2 rounded-full bg-white dark:bg-neutral-800 mx-2" />
    )}
  </div>
);

export default CustomTreeItem;