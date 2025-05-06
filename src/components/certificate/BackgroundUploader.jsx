import React, { useRef, useState } from 'react';
import { useCertificate } from '../../context/CertificateContext';

const BackgroundUploader = () => {
  const { background, backgroundType, setBackgroundImage } = useCertificate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isUrlLoading, setIsUrlLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Check if the file is an image or PDF
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setBackgroundImage(imageUrl, 'image');
        setIsUploading(false);
      } else if (file.type === 'application/pdf') {
        // For PDFs, create a blob URL with the correct content type
        const fileReader = new FileReader();

        fileReader.onload = function(event) {
          const arrayBuffer = event.target.result;
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(blob);

          setBackgroundImage(pdfUrl, 'pdf');

          // PDF conversion to image might take a moment
          // The loading state will be managed by the PDFBackground component
          setTimeout(() => {
            setIsUploading(false);
          }, 500);
        };

        fileReader.onerror = function() {
          console.error('Error reading file');
          alert('Error reading PDF file. Please try a different file.');
          setIsUploading(false);
        };

        fileReader.readAsArrayBuffer(file);
      } else {
        // Show a more descriptive error message
        alert(`Unsupported file type: ${file.type}\nPlease upload an image or PDF file.`);
        setIsUploading(false);
        return;
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert(`Error processing file: ${error.message || 'Unknown error'}`);
      setIsUploading(false);
      return;
    }

    e.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClearBackground = () => {
    setBackgroundImage(null, null);
  };

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput);
    setPdfUrl('');
  };

  const handleUrlChange = (e) => {
    setPdfUrl(e.target.value);
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();

    if (!pdfUrl) {
      alert('Please enter a PDF URL');
      return;
    }

    // Validate URL format
    try {
      new URL(pdfUrl);
    } catch (error) {
      alert('Please enter a valid URL');
      return;
    }

    setIsUrlLoading(true);

    try {
      // Simulate API call to validate PDF URL
      // In a real implementation, you might want to check if the URL points to a valid PDF
      // For now, we'll just assume it's valid if it ends with .pdf or contains pdf in the URL
      const isPdfUrl = pdfUrl.toLowerCase().endsWith('.pdf') || pdfUrl.toLowerCase().includes('pdf');

      if (!isPdfUrl) {
        alert('The URL does not appear to be a PDF. Please enter a valid PDF URL.');
        setIsUrlLoading(false);
        return;
      }

      // Set the PDF URL as the background
      setBackgroundImage(pdfUrl, 'pdf');

      // Reset state
      setIsUrlLoading(false);
      setShowUrlInput(false);
      setPdfUrl('');
    } catch (error) {
      console.error('Error loading PDF from URL:', error);
      alert(`Error loading PDF from URL: ${error.message || 'Unknown error'}`);
      setIsUrlLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,application/pdf"
        className="hidden"
      />

      {!showUrlInput ? (
        <div className="flex gap-2">
          <button
            onClick={handleButtonClick}
            disabled={isUploading || isUrlLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
              isUploading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            title="Upload an image or PDF file from your device"
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload File'
            )}
          </button>

          <button
            onClick={toggleUrlInput}
            disabled={isUploading || isUrlLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Enter a URL to a PDF file"
          >
            Use PDF URL
          </button>
        </div>
      ) : (
        <form onSubmit={handleUrlSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={pdfUrl}
            onChange={handleUrlChange}
            placeholder="Enter PDF URL (e.g., https://example.com/certificate.pdf)"
            className="px-3 py-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isUrlLoading}
          />

          <button
            type="submit"
            disabled={isUrlLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
              isUrlLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isUrlLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Load PDF'
            )}
          </button>

          <button
            type="button"
            onClick={toggleUrlInput}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </form>
      )}

      {background && (
        <>
          <button
            onClick={handleClearBackground}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            title="Remove the current background"
          >
            Clear Background
          </button>
          <div className="text-sm bg-gray-100 px-2 py-1 rounded">
            <span className={`font-medium ${backgroundType === 'pdf' ? 'text-blue-600' : 'text-green-600'}`}>
              {backgroundType === 'pdf' ? 'PDF (as image)' : 'Image'} Background
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BackgroundUploader;
