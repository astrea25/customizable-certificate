import React from 'react';
import SizeIndicator from './SizeIndicator';
import Certificate from './templates/BaseCertificate';

const Canvas = () => {
  return (
    <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center overflow-auto">
      <div className="relative bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[1123px] h-[794px]">
        <Certificate />
      </div>
    </div>
  );
};

export default Canvas;
