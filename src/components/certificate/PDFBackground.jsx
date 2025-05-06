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

      // Determine if this is a URL or a Blob URL
      const isExternalUrl = pdfUrl.startsWith('http') && !pdfUrl.startsWith('blob:');

      // For external URLs, we need to handle CORS
      const loadPdf = async () => {
        try {
          let pdfSource = pdfUrl;

          // If it's an external URL, we might need to proxy it or fetch it first
          if (isExternalUrl) {
            try {
              // For demonstration purposes, we'll try to load it directly
              // In a real implementation, you might want to proxy this request through your backend
              // to avoid CORS issues
              const response = await fetch(pdfUrl, {
                mode: 'cors',
                headers: {
                  'Access-Control-Allow-Origin': '*'
                }
              });

              if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
              }

              const arrayBuffer = await response.arrayBuffer();
              pdfSource = { data: new Uint8Array(arrayBuffer) };
            } catch (fetchError) {
              console.warn('Direct fetch failed, falling back to direct loading:', fetchError);
              // Fall back to direct loading (might fail due to CORS)
              pdfSource = pdfUrl;
            }
          }

          // Load the PDF document
          const loadingTask = pdfjsLib.getDocument(pdfSource);
          const pdf = await loadingTask.promise;

          // Get the first page
          const page = await pdf.getPage(1);

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

          await page.render(renderContext).promise;

          // Convert the canvas to an image
          const imageUrl = canvas.toDataURL('image/png');
          setPdfImage(imageUrl);
          setIsLoading(false);
        } catch (err) {
          console.error('Error rendering PDF:', err);
          setError(`Failed to render PDF: ${err.message || 'Unknown error'}`);
          setIsLoading(false);
        }
      };

      loadPdf();
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
            <div className="animate-pulse">
              {pdfUrl.startsWith('http') && !pdfUrl.startsWith('blob:')
                ? 'Fetching and converting PDF from URL...'
                : 'Converting PDF to image...'}
            </div>
            <div className="text-sm text-gray-500 mt-2">This may take a moment</div>
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
