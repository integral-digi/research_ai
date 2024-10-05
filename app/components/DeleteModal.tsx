import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const DeleteModal = ({ open, close, isOpen }: any) => {
  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close} __demoMode>
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="space-y-6 w-full max-w-md rounded-xl bg-white dark:bg-neutral-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-2xl font-bold text-gray-900 dark:text-white">
                Delete Item?
              </DialogTitle>
              <p className="mt-4 text-base text-gray-700/80 dark:text-white/80 font-medium">
                Are you sure you want to delete this item? This action cannot be undone and the item may be lost forever.
              </p>
              <div className="mt-4 flex space-x-6 items-center">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-900 dark:bg-white py-1.5 px-3 text-sm/6 font-bold text-white dark:text-gray-700 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-bold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteModal;
