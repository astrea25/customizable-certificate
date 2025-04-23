import React, { useEffect } from 'react';
import SimpleCertificate from './templates/CertificateTemplate';

const SimpleCanvas = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center overflow-auto">
      <div className="relative bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[1123px] h-[794px] certificate-canvas-container">
        <SimpleCertificate />
      </div>
    </div>
  );
};

export default SimpleCanvas;
