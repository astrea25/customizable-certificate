import React from 'react';
import { useCertificate } from '../../../context/CertificateContext';
import CertificateElements from '../CertificateElement';

const SimpleCertificate = () => {
  const { elements, background } = useCertificate();

  return (
    <div className="relative w-full h-full">
      {background ? (
        <img
          src={background}
          alt="Certificate Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-white"></div>
      )}

      <div className="absolute inset-0 z-20" style={{ overflow: 'visible' }}>
        {elements.map((element) => (
          <CertificateElements
            key={element.id}
            element={element}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCertificate;
