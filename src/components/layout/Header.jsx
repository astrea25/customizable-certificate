import React, { useState, useRef, useEffect } from 'react';
import BackgroundUploader from '../certificate/BackgroundUploader';
import { exportCertificateAsPDF } from '../../utils/pdfExport';

const Header = () => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [filename, setFilename] = useState('certificate');
  const [paperSize, setPaperSize] = useState('a4');
  const [orientation, setOrientation] = useState('landscape');
  const exportOptionsRef = useRef(null);

  // Handle click outside to close export options
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportOptionsRef.current && !exportOptionsRef.current.contains(event.target)) {
        setShowExportOptions(false);
      }
    };

    if (showExportOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportOptions]);

  const handleExportPDF = () => {
    // Get the certificate canvas element
    const canvasElement = document.querySelector('.certificate-canvas-container');

    if (canvasElement) {
      // Add .pdf extension if not present
      const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

      // Export with selected options
      exportCertificateAsPDF(canvasElement, finalFilename, {
        paperSize,
        orientation
      });

      setShowExportOptions(false);
    } else {
      console.error('Certificate canvas not found');
    }
  };

  const handleExportClick = () => {
    setShowExportOptions(true);
  };

  const handleCancelExport = () => {
    setShowExportOptions(false);
  };

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };

  const handlePaperSizeChange = (e) => {
    setPaperSize(e.target.value);
  };

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleExportPDF();
    } else if (e.key === 'Escape') {
      handleCancelExport();
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customizable Certificate</h1>
        <div className="flex items-center space-x-4">
          <BackgroundUploader />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                  New Certificate
                </button>
              </li>
              <li>
                <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                  Save
                </button>
              </li>
              <li>
                {showExportOptions ? (
                  <div
                    ref={exportOptionsRef}
                    className="flex flex-col bg-blue-800 rounded overflow-hidden p-2 absolute z-10 right-4 mt-2 shadow-lg">
                    <div className="mb-2">
                      <label className="block text-sm mb-1">Filename:</label>
                      <input
                        type="text"
                        value={filename}
                        onChange={handleFilenameChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Filename"
                        className="px-2 py-1 bg-blue-700 text-white placeholder-blue-300 outline-none w-full rounded"
                        autoFocus
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm mb-1">Paper Size:</label>
                      <select
                        value={paperSize}
                        onChange={handlePaperSizeChange}
                        className="px-2 py-1 bg-blue-700 text-white outline-none w-full rounded"
                      >
                        <option value="a4">A4</option>
                        <option value="letter">Letter</option>
                        <option value="custom">Custom (Canvas Size)</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm mb-1">Orientation:</label>
                      <select
                        value={orientation}
                        onChange={handleOrientationChange}
                        className="px-2 py-1 bg-blue-700 text-white outline-none w-full rounded"
                      >
                        <option value="landscape">Landscape</option>
                        <option value="portrait">Portrait</option>
                      </select>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={handleExportPDF}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded"
                      >
                        Export
                      </button>
                      <button
                        onClick={handleCancelExport}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleExportClick}
                    className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors"
                  >
                    Export PDF
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
