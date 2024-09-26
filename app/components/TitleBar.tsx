"use client";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import TagBar from "./TagBar";
import DeleteModal from "./DeleteModal"; // Import DeleteModal

interface TitleProps {
  title: string;
}

const TitleBar: React.FC<TitleProps> = ({ title }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for DeleteModal

  // Handle title editing
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleEditSubmit = () => {
    setIsEditing(false);
    console.log("Title edited to:", currentTitle);
  };

  const handleIconClick = (icon: string) => {
    console.log(`${icon} icon clicked`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); // Open the DeleteModal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the DeleteModal
  };

  return (
    <div className="z-30 w-full h-[4.5rem] bg-white dark:bg-neutral-800 shadow-3xl flex items-center relative">
      <div className="w-full">
        <div className="w-full flex items-center justify-between px-8">
          <section className="space-x-16 flex items-center">
            <section className="flex items-center gap-x-3 w-fit">
              <ArrowLeftIcon className="text-gray-700 dark:text-white w-5 h-5 md:w-4 md:h-4" />
              <ArrowRightIcon className="text-gray-700 dark:text-white w-5 h-5 md:w-4 md:h-4" />
            </section>
            <section className="w-fit flex items-center space-x-8">
              {/* Conditional rendering for editing state */}
              {isEditing ? (
                <input
                  type="text"
                  value={currentTitle}
                  onChange={handleTitleChange}
                  onBlur={handleEditSubmit}
                  className="text-left text-lg md:text-base font-medium text-gray-700 dark:text-white bg-transparent border-b border-gray-300 focus:outline-none"
                  autoFocus
                />
              ) : (
                <p className="text-left text-nowrap text-lg md:text-base font-medium text-gray-700 dark:text-white">
                  {currentTitle}
                </p>
              )}
              <PencilIcon
                className="text-gray-700/50 dark:text-white/50 w-3.5 h-3.5 md:w-3 md:h-3 cursor-pointer"
                onClick={handleEditClick}
                aria-label="Edit title"
              />
            </section>
          </section>
          <section className="flex items-center space-x-4">
            <BookmarkIcon
              className="text-gray-700 dark:text-white w-4 h-4 md:hidden cursor-pointer"
              onClick={() => handleIconClick("Bookmark")}
              aria-label="Bookmark"
            />
            <TrashIcon
              className="text-gray-700 dark:text-white w-4 h-4 md:hidden cursor-pointer"
              onClick={openDeleteModal} // Trigger DeleteModal on TrashIcon click
              aria-label="Delete"
            />
            <Popover>
              <PopoverButton className="w-fit h-fit">
                <EllipsisVerticalIcon
                  className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer"
                  onClick={() => handleIconClick("Options")}
                  aria-label="More options"
                />
              </PopoverButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute mt-2 w-full left-0 right-0 z-50">
                  <TagBar />
                </PopoverPanel>
              </Transition>
            </Popover>
          </section>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal open={openDeleteModal} close={closeDeleteModal} isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} />
    </div>
  );
};

export default TitleBar;
