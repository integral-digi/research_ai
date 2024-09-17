import { useState, useCallback } from "react";

type Shape = {
  type: string;
  text?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  src?: string;
  backgroundColor?: string;
};

type Action = {
  action: "add" | "draw";
  shape?: Shape;
  line?: any; // Adjust type based on your lines
};

export const useUndoRedo = () => {
  const [undoStack, setUndoStack] = useState<Action[]>([]);
  const [redoStack, setRedoStack] = useState<Action[]>([]);

  const undoAction = useCallback(
    (setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, setLines: React.Dispatch<React.SetStateAction<any[]>>) => {
      if (undoStack.length === 0) return;

      const lastAction = undoStack.pop();
      if (lastAction?.action === "add") {
        setShapes((prevShapes) => prevShapes.slice(0, -1));
      } else if (lastAction?.action === "draw") {
        setLines((prevLines) => prevLines.slice(0, -1));
      }
      setRedoStack((prev) => [...prev, lastAction!]);
      setUndoStack([...undoStack]);
    },
    [undoStack]
  );

  const redoAction = useCallback(
    (setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, setLines: React.Dispatch<React.SetStateAction<any[]>>) => {
      if (redoStack.length === 0) return;

      const lastUndoneAction = redoStack.pop();
      if (lastUndoneAction?.action === "add") {
        setShapes((prevShapes) => [...prevShapes, lastUndoneAction.shape!]);
      } else if (lastUndoneAction?.action === "draw") {
        setLines((prevLines) => [...prevLines, lastUndoneAction.line!]);
      }
      setUndoStack((prev) => [...prev, lastUndoneAction!]);
      setRedoStack([...redoStack]);
    },
    [redoStack]
  );

  return { undoAction, redoAction };
};
