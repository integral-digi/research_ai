import * as React from "react";
import {
  ChevronRightIcon,
  FolderIcon,
  Square3Stack3DIcon,
  DocumentIcon,
  TrashIcon,
  VideoCameraIcon,
  PhotoIcon,
  BookmarkIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import { RichTreeView } from "@mui/x-tree-view";
import clsx from "clsx";
import { data } from "@/utils/data";

type FileType =
  | "image"
  | "pdf"
  | "doc"
  | "video"
  | "folder"
  | "pinned"
  | "trash";

const getIconFromFileType = (fileType?: FileType) => {
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
      return Square3Stack3DIcon;
  }
};

const CustomLabel = ({
  icon: Icon,
  expandable,
  children,
}: any) => (
  <div className="flex items-center space-x-4">
    {Icon && (
      <Icon className="w-5 h-5 mr-2 text-gray-700 dark:text-white" />
    )}
    <span className="text-gray-700 dark:text-white font-medium">
      {children}
    </span>
    {expandable && (
      <span className="inline-block w-2 h-2 rounded-full bg-white dark:bg-neutral-800 mx-2" />
    )}
  </div>
);

const CustomTreeItem = React.forwardRef(
  ({ id, label, fileType, children, isEditable, ...other }: any, ref) => {
    const expandable = !!children?.length;
    const Icon = getIconFromFileType(fileType);

    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [currentLabel, setCurrentLabel] = React.useState(label);

    const handleToggle = () => {
      setIsExpanded((prev) => !prev);
    };

    const handleLabelClick = () => {
      if (isEditable) {
        setIsEditing(true);
      }
    };

    const handleBlur = () => {
      setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLabel(e.target.value);
    };

    const handlePlusClick = () => {
      console.log("Clicked");
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
            "flex items-center space-x-2 p-2 rounded hover:bg-gray-100 hover:dark:bg-neutral-800",
            expandable && "cursor-pointer"
          )}
          onClick={handleToggle}
        >
          {isEditing ? (
            <input
              type="text"
              value={currentLabel}
              onChange={handleChange}
              onBlur={handleBlur}
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
            <PlusIcon
              className="w-5 h-5 text-gray-700 dark:text-white ml-auto cursor-pointer"
              onClick={handlePlusClick}
            />
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

const NavTree = () => (
  <div className="max-w-md mx-auto p-4 overflow-y-auto bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-neutral-800 min-h-screen">
    <RichTreeView
      items={data.items}
      defaultExpandedItems={['grid', 'pickers']}
      defaultSelectedItems="1.1"
      isItemEditable
      experimentalFeatures={{ labelEditing: true }}
      className="flex-grow"
      slots={{ item: CustomTreeItem }}
    />
  </div>
);

export default NavTree;
