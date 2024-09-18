import Panel from './Panel';

const CanvasControls = ({
  handleUploadImage,
  handleZoomIn,
  handleZoomOut,
  handleZoomToFit,
  handleResetCanvas,
  handleRedo,
  handleUndo,
  handleAddStickyNote,
  handleAddText,
  handleActivateDrawing,
  isDrawingActive
}: any) => (
  <Panel
    handleUploadImage={handleUploadImage}
    handleZoomIn={handleZoomIn}
    handleZoomOut={handleZoomOut}
    handleZoomToFit={handleZoomToFit}
    handleResetCanvas={handleResetCanvas}
    handleRedo={handleRedo}
    handleUndo={handleUndo}
    handleAddStickyNote={handleAddStickyNote}
    handleAddText={handleAddText}
    handleActivateDrawing={handleActivateDrawing}
    isDrawingActive={isDrawingActive}
  />
);

export default CanvasControls;
