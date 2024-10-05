"use client";
import { ChevronUpDownIcon, Cog6ToothIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useModal } from "@/context/ModalProvider";
import { data } from "@/utils/data";
import { useRef, useState } from "react";
import SettingsTab from "../settings/components/SettingsTab";
import NavTree from "./NavTree";
import About from "./About";

const LeftPanel = ({ isVisible }: { isVisible: boolean }) => {
  const { isOpen, toggleModal } = useModal();
  const closeButtonRef = useRef(null); // To manage focus on modal close
  const [isAboutOpen, setIsAboutOpen] = useState(false); // New state for About modal

  if (!isVisible) return null;

  const openAboutModal = () => setIsAboutOpen(true);
  const closeAboutModal = () => setIsAboutOpen(false);

  return (
    <div className="bg-slate-100 dark:bg-zinc-900 h-full min-h-screen top-0 bottom-0">
      <NavTree />
      <section className="space-y-4">
        <hr className="w-full bg-slate-300 dark:border-gray-700" />
        <section className="flex items-center justify-between px-8 pb-4">
          <section className="flex items-center space-x-4">
            <ChevronUpDownIcon className="text-gray-700 dark:text-white w-4 h-4" />
            <p className="text-gray-700 dark:text-white text-base font-medium">
              {data.user.vault[0].name}
            </p>
          </section>
          <section className="space-x-2 flex items-center">
            <QuestionMarkCircleIcon
              className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer"
              onClick={openAboutModal}
            />
            <Cog6ToothIcon
              className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer"
              onClick={() => toggleModal(true)}
            />
          </section>
        </section>
      </section>

      {/* About Modal */}
      {isAboutOpen && (
        <Dialog
          as="div"
          className="relative z-50"
          open={isAboutOpen}
          initialFocus={closeButtonRef}
          onClose={closeAboutModal}
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="min-h-96 bg-white dark:bg-neutral-800 rounded-xl shadow-lg w-full max-w-xl p-10 z-50">
              <section className="flex justify-end">
                <button
                  ref={closeButtonRef}
                  onClick={closeAboutModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </section>
              <About />
            </DialogPanel>
          </div>
        </Dialog>
      )}

      {/* Settings Modal */}
      {isOpen && (
        <Dialog
          as="div"
          className="relative z-50"
          open={isOpen}
          initialFocus={closeButtonRef}
          onClose={() => toggleModal(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg w-full max-w-3xl p-10 z-50">
              <section className="flex justify-end">
                <button
                  ref={closeButtonRef}
                  onClick={() => toggleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </section>
              <SettingsTab />
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default LeftPanel;
