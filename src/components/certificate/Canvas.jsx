import React, { useRef, forwardRef } from 'react';
import SimpleCertificate from './templates/CertificateTemplate';

const SimpleCanvas = forwardRef((_, ref) => {
  const canvasRef = useRef(null);

  // Use the forwarded ref if provided, otherwise use the local ref
  const certificateRef = ref || canvasRef;

  return (
    <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center overflow-auto">
      <div
        ref={certificateRef}
        className="relative w-[1123px] h-[794px] certificate-canvas-container"
      >
        <SimpleCertificate />
      </div>
    </div>
  );
});

export default SimpleCanvas;
