"use client";
import { useEffect, useRef, useState } from "react";
import { LinearProgress } from "@mui/material";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
  ArrowsPointingInIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import * as pdfjsLib from 'pdfjs-dist';
import "pdfjs-dist/build/pdf.worker.min.mjs";
import LinearLoader from "@/utils/Loader";

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null); // PDF document
  const [pageNumber, setPageNumber] = useState(1); // Current page
  const [numPages, setNumPages] = useState<number | null>(null); // Total pages
  const [zoom, setZoom] = useState<number>(1.0); // Zoom level
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait"); // Orientation
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas for rendering

  // Debounce helper to limit the frequency of zoom and page changes
  const debounce = (func: any, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);
      setError(null);
      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const doc = await loadingTask.promise;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load document. Check the file URL or try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [fileUrl]);

  // Render the current page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false; // Cancel flag

    const renderPage = async () => {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: zoom });
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) return;

      // Fit canvas to the size of the PDF page
      canvas.width = orientation === "portrait" ? viewport.width : viewport.height;
      canvas.height = orientation === "portrait" ? viewport.height : viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: orientation === "portrait" ? viewport : viewport.clone({ rotation: 90 }),
      };

      const renderTask = page.render(renderContext);

      // Cancel previous render if component is unmounted or state changes
      renderTask.promise.then(() => {
        if (isCancelled) {
          renderTask.cancel();
        }
      });
    };

    renderPage();

    // Cleanup function to set the cancel flag when component unmounts or before the next render
    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, pageNumber, zoom, orientation]);

  // Handle Zoom
  const handleZoomIn = () => setZoom((prevZoom) => prevZoom + 0.5);
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(0.5, prevZoom - 0.5));
  const handleZoomToFit = () => setZoom(1.0);

  // Handle Page Change with debounce
  const handlePageChange = debounce((offset: number) => {
    if (numPages) {
      setPageNumber((prevPage) => Math.max(1, Math.min(numPages, prevPage + offset)));
    }
  }, 300); // Debounced by 300ms

  // Handle Orientation Change
  const handleOrientationChange = () =>
    setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"));

  return (
    <div className="w-full max-h-screen overflow-y-scroll relative">
      {/* Loading and Error States */}
      {loading && !error && (
        <div className="flex justify-center items-center h-full px-32">
          <LinearLoader />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-full">
          <span className="text-red-600">{error}</span>
        </div>
      )}

      {/* Render the PDF */}
      {!loading && !error && (
        <div
          className={`relative py-12 ${
            orientation === "landscape" ? "w-screen h-auto" : "w-auto h-screen"
          }`}
        >
          <canvas ref={canvasRef} className="mx-auto" />
        </div>
      )}

      {/* Toolbar */}
      <div className="shadow-3xl py-4 px-8 rounded-lg bg-slate-100 dark:bg-zinc-900 w-fit flex items-center space-x-8 fixed bottom-16 translate-x-full lg:translate-x-0">
        {/* Page Controls */}
        <div className="flex items-center space-x-4">
          <button onClick={() => handlePageChange(-1)} disabled={pageNumber <= 1}>
            <ChevronUpIcon className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <span className="text-gray-700 dark:text-white text-sm font-medium">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={pageNumber >= (numPages || 1)}
          >
            <ChevronDownIcon className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Zoom and Orientation Controls */}
        <div className="flex items-center space-x-6">
          <button onClick={handleZoomOut}>
            <MinusIcon className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <button onClick={handleZoomIn}>
            <PlusIcon className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <button onClick={handleZoomToFit}>
            <ArrowsPointingInIcon className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <button onClick={handleOrientationChange}>
            <ArrowPathIcon className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;