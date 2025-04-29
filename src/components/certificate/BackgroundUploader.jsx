import React, { useRef } from 'react';
import { useCertificate } from '../../context/CertificateContext';

const BackgroundUploader = () => {
  const { background, setBackgroundImage } = useCertificate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setBackgroundImage(imageUrl);

    e.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClearBackground = () => {
    setBackgroundImage(null);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Upload Background
      </button>

      {background && (
        <button
          onClick={handleClearBackground}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear Background
        </button>
      )}
    </div>
  );
};

export default BackgroundUploader;
