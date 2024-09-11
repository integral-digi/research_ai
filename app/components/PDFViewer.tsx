"use client";
import { useState, useCallback } from "react";
import { Worker, Viewer, SpecialZoomLevel, PdfJs } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    PlusIcon,
    MinusIcon,
    ArrowsPointingInIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Define the worker URL for PDF.js
const workerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const [zoom, setZoom] = useState<number | SpecialZoomLevel>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");

    // Callback to handle document load success
    const onLoadSuccess = useCallback((pdfDocument: PdfJs.PdfDocument) => {
        setTotalPages(pdfDocument.numPages);
    }, []);

    const handleZoomIn = () => {
        if (typeof zoom === "number") {
            setZoom(prevZoom => prevZoom + 0.5);
        }
    };

    const handleZoomOut = () => {
        if (typeof zoom === "number") {
            setZoom(prevZoom => Math.max(0.5, prevZoom - 0.5));
        }
    };

    const handleZoomToFit = () => {
        setZoom(SpecialZoomLevel.PageFit); 
    };

    const handlePageChange = (offset: number) => {
        setPageNumber(prevPage => Math.max(1, Math.min(totalPages, prevPage + offset)));
    };

    const handleOrientationChange = () => {
        setOrientation(prevOrientation =>
            prevOrientation === "portrait" ? "landscape" : "portrait"
        );
    };

    return (
        <div className="w-full max-h-screen overflow-y-scroll relative">
            <div className={`relative ${orientation === "landscape" ? "w-screen h-auto" : "w-auto h-screen"}`}>
                <div className="flex flex-col h-full">
                    <div className="flex-grow py-12">
                        <Worker workerUrl={workerUrl}>
                            <Viewer
                                fileUrl={fileUrl}
                                onDocumentLoad={onLoadSuccess}
                                defaultScale={zoom}
                            />
                        </Worker>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="shadow-3xl py-4 px-8 rounded-lg bg-slate-100 dark:bg-zinc-900 w-fit flex items-center space-x-8 fixed bottom-16 translate-x-full">
                    {/* Page Controls */}
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handlePageChange(-1)} disabled={pageNumber <= 1}>
                            <ChevronUpIcon className="w-6 h-6 text-gray-700 dark:text-white" />
                        </button>
                        <span className="text-gray-700 dark:text-white text-sm font-medium">
                            Page {pageNumber} of {totalPages}
                        </span>
                        <button onClick={() => handlePageChange(1)} disabled={pageNumber >= totalPages}>
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
        </div>
    );
};

export default PDFViewer;
