import React, { useState, useEffect, useRef } from 'react';

const PDFBackground = ({ pdfUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfImage, setPdfImage] = useState(null);
  const canvasRef = useRef(null);

  // Render the PDF as an image when the URL changes
  useEffect(() => {
    if (!pdfUrl) return;

    setIsLoading(true);
    setError(null);
    setPdfImage(null);

    // Create a script element to load PDF.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.js';
    script.async = true;

    script.onload = () => {
      const pdfjsLib = window['pdfjs-dist/build/pdf'];

      // Set the worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      loadingTask.promise
        .then(pdf => {
          // Get the first page
          return pdf.getPage(1);
        })
        .then(page => {
          // Set the scale to fit the canvas
          const viewport = page.getViewport({ scale: 1.0 });

          // Create a canvas for rendering
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          // Set canvas dimensions to match the viewport
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Render the PDF page to the canvas
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          return page.render(renderContext).promise.then(() => {
            // Convert the canvas to an image
            const imageUrl = canvas.toDataURL('image/png');
            setPdfImage(imageUrl);
            setIsLoading(false);
          });
        })
        .catch(err => {
          console.error('Error rendering PDF:', err);
          setError('Failed to render PDF. Please try a different file.');
          setIsLoading(false);
        });
    };

    script.onerror = () => {
      setError('Failed to load PDF rendering library.');
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="absolute inset-0 w-full h-full bg-white">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center py-10 text-blue-600">
            <div className="animate-pulse">Converting PDF to image...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center py-10 text-red-500">
            {error}
          </div>
        </div>
      )}

      {pdfImage && (
        <img
          src={pdfImage}
          alt="PDF Background"
          className="absolute inset-0 w-full h-full object-contain"
          ref={canvasRef}
        />
      )}
    </div>
  );
};

export default PDFBackground;
