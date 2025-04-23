import React from 'react';

const ImageBasedCertificate = () => {
  return (
    <div className="relative w-full h-full">
      <img
        src="/src/components/layout/background.png"
        alt="Certificate Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-6 rounded-4xl bg-white shadow-lg border border-gray-200">
        <div className="absolute rounded-4xl inset-3 border border-black z-1"></div>
        <div className="w-full h-full flex flex-col items-center justify-between p-12">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-8xl font-black tracking-wider text-center mb-4 text-black">CERTIFICATE</h1>

            <div className="flex items-center justify-center w-full mb-12">
              <div className="h-px bg-black w-40"></div>
              <h2 className="text-3xl font-bold tracking-widest mx-6 text-black">OF APPRECIATION</h2>
              <div className="h-px bg-black w-40"></div>
            </div>

            <p className="text-3xl uppercase tracking-wider mb-8 text-black">This certificate is proudly presented to</p>

            <div className="h-20 mb-3 flex items-center justify-center"></div>
            <div className="h-px w-3/4 mb-8 bg-yellow-700"></div>

            <p className="text-center text-xl mb-10 max-w-4xl text-black">
              This certificate is given for their achievement in the field of
              education and proves that she is competent in her field.
            </p>
          </div>

          <div className="w-4/5 flex items-center justify-between mt-auto pb-6">
            <div className="flex flex-col items-center">
              <div className="h-px bg-black w-56 mb-3"></div>
              <p className="text-base font-semibold text-black">Head of Event</p>
            </div>

            <img
              src="/src/components/layout/medal.png"
              alt="Certificate Medal"
              className="w-28 h-28 object-contain mx-4"
            />

            <div className="flex flex-col items-center">
              <div className="h-px bg-black w-56 mb-3"></div>
              <p className="text-base font-semibold text-black">Mentor</p>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/src/components/layout/foreground.png"
        alt="Certificate Foreground"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
      />
    </div>
  );
};

export default ImageBasedCertificate;
