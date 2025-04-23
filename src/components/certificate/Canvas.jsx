import React from 'react';
import SizeIndicator from './SizeIndicator';

const Canvas = () => {
  return (
    <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center overflow-auto">
      <div
        className="bg-white shadow-lg w-[1123px] h-[794px]" // A4 size in landscape orientation (approximately)
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}
      >

        {/* This is where the certificate content will be rendered */}
        <div className="absolute inset-0 p-12 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800">Certificate of Achievement</h2>
            <p className="text-xl text-gray-600 mt-2">This certifies that</p>
          </div>

          <div className="text-center mb-6">
            <p className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 px-12">
              [Recipient Name]
            </p>
          </div>

          <div className="text-center mb-8">
            <p className="text-xl text-gray-600">
              has successfully completed the course
            </p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              [Course Name]
            </p>
          </div>

          <div className="flex justify-between w-3/4 mt-8">
            <div className="text-center">
              <div className="w-48 border-t-2 border-gray-300 pt-1">
                <p className="text-gray-800 font-semibold">Date</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-48 border-t-2 border-gray-300 pt-1">
                <p className="text-gray-800 font-semibold">Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size indicator */}
      <div className="flex justify-center mt-4">
        <SizeIndicator />
      </div>
    </div>
  );
};

export default Canvas;
