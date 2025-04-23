import React, { createContext, useState, useContext } from 'react';

const CertificateContext = createContext();

export const useCertificate = () => useContext(CertificateContext);

export const CertificateProvider = ({ children }) => {
  const [elements, setElements] = useState([]);

  const addElement = (element) => {
    setElements((prev) => [...prev, element]);
  };

  const updateElement = (id, updates) => {
    setElements((prev) =>
      prev.map((element) => (element.id === id ? { ...element, ...updates } : element))
    );
  };

  const removeElement = (id) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <CertificateContext.Provider
      value={{
        elements,
        addElement,
        updateElement,
        removeElement,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
