import { useCallback } from "react";
import { useUndoRedo } from "./canvasHooks"; 

export const useCanvasHandlers = (
  setShapes: React.Dispatch<React.SetStateAction<any[]>>,
  setLines: React.Dispatch<React.SetStateAction<any[]>>,
  undoStack: any[],
  setUndoStack: React.Dispatch<React.SetStateAction<any[]>>,
  redoStack: any[],
  setRedoStack: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { undoAction, redoAction } = useUndoRedo();

  const handleAddText = useCallback(() => {
    const newShape = { type: "text", text: "New Text", x: 100, y: 100 };
    setShapes((prev) => [...prev, newShape]);
    setUndoStack((prev) => [...prev, { action: "add", shape: newShape }]);
    setRedoStack([]);
  }, [setShapes, setUndoStack, setRedoStack]);

  const handleAddStickyNote = useCallback(() => {
    const newShape = {
      type: "stickyNote",
      text: "New Sticky Note",
      x: 150,
      y: 150,
      width: 200,
      height: 150,
      backgroundColor: "#ffeb3b",
    };
    setShapes((prev) => [...prev, newShape]);
    setUndoStack((prev) => [...prev, { action: "add", shape: newShape }]);
    setRedoStack([]);
  }, [setShapes, setUndoStack, setRedoStack]);

  const handleUploadImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const newShape = { type: "image", src: reader.result as string, x: 100, y: 100 };
        setShapes((prev) => [...prev, newShape]);
        setUndoStack((prev) => [...prev, { action: "add", shape: newShape }]);
        setRedoStack([]);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [setShapes, setUndoStack, setRedoStack]);

  const handleUndo = useCallback(() => {
    undoAction(setShapes, setLines);
  }, [undoAction, setShapes, setLines]);

  const handleRedo = useCallback(() => {
    redoAction(setShapes, setLines);
  }, [redoAction, setShapes, setLines]);

  return {
    handleAddText,
    handleAddStickyNote,
    handleUploadImage,
    handleUndo,
    handleRedo,
  };
};
