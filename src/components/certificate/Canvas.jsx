import React from 'react';
import SimpleCertificate from './templates/CertificateTemplate';

const SimpleCanvas = () => {
  return (
    <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center overflow-auto">
      <div className="relative w-[1123px] h-[794px] certificate-canvas-container">
        <SimpleCertificate />
      </div>
    </div>
  );
};

export default SimpleCanvas;
