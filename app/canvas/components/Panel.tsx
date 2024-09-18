import { ArrowsPointingInIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  ArrowTurnDownRightIcon,
  ArrowUturnRightIcon,
  ArrowUturnLeftIcon,
  PencilIcon,
  DocumentTextIcon,
  MinusIcon,
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { memo } from "react";

// Define a more specific type for the debounce function
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Panel = ({
  handleUploadImage,
  handleZoomIn,
  handleZoomOut,
  handleZoomToFit,
  handleResetCanvas,
  handleRedo,
  handleUndo,
  handleAddStickyNote,
  handleActivateDrawing,
  isDrawingActive,
}: any) => {
  const debouncedZoomIn = debounce(handleZoomIn, 150);
  const debouncedZoomOut = debounce(handleZoomOut, 150);
  const debouncedUndo = debounce(handleUndo, 150);
  const debouncedRedo = debounce(handleRedo, 150);

  return (
    <div className="flex items-center space-x-2 cursor-auto">
      <div className="shadow-3xl h-12 flex items-center w-fit px-4 bg-slate-100 dark:bg-zinc-900 rounded-tl-xl rounded-bl-xl">
        <section className="flex items-center space-x-4">
          <PhotoIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Upload photo"
            onClick={handleUploadImage}
          />
          <DocumentTextIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Add sticky note"
            onClick={handleAddStickyNote}
          />
          <PencilIcon
            className={`text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500 ${
              isDrawingActive ? "text-green-500 cursor-pen" : ""
            }`}
            aria-label={isDrawingActive ? "Deactivate freehand drawing" : "Activate freehand drawing"}
            onClick={handleActivateDrawing}
          />
          <ArrowTurnDownRightIcon className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500" aria-label="Custom action" />
        </section>
      </div>
      <div className="shadow-3xl h-12 bg-slate-100 dark:bg-zinc-900 px-4 rounded-tr-xl rounded-br-xl">
        <section className="flex items-center space-x-4 h-full">
          <PlusIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Zoom in"
            onClick={debouncedZoomIn}
          />
          <ArrowPathIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Reset canvas"
            onClick={handleResetCanvas}
          />
          <MinusIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Zoom out"
            onClick={debouncedZoomOut}
          />
          <ArrowsPointingInIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Zoom to fit"
            onClick={handleZoomToFit}
          />
          <ArrowUturnLeftIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Undo"
            onClick={debouncedUndo}
          />
          <ArrowUturnRightIcon
            className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500"
            aria-label="Redo"
            onClick={debouncedRedo}
          />
          <div className="border border-slate-400 h-full" />
          <QuestionMarkCircleIcon className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500" aria-label="FAQs" />
          <Cog6ToothIcon className="text-gray-700 dark:text-white w-4 h-4 cursor-pointer hover:text-blue-500" aria-label="Settings" />
        </section>
      </div>
    </div>
  );
};

export default memo(Panel);
