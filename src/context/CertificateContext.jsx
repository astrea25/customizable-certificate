import React, { createContext, useState, useContext } from 'react';

const CertificateContext = createContext();

export const useCertificate = () => useContext(CertificateContext);

export const CertificateProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [background, setBackground] = useState(null);

  const addElement = (element) => {
    setElements((prev) => [...prev, element]);
  };

  const updateElement = (id, updates) => {
    setElements((prev) =>
      prev.map((element) => (element.id === id ? { ...element, ...updates } : element))
    );
  };

  const removeElement = (id) => {
    // Check if the element with this ID exists
    const elementExists = elements.some(element => element.id === id);

    if (!elementExists) {
      return;
    }

    setElements((prev) => {
      const newElements = prev.filter((element) => element.id !== id);
      return newElements;
    });
  };

  const setBackgroundImage = (imageUrl) => {
    setBackground(imageUrl);
  };

  return (
    <CertificateContext.Provider
      value={{
        elements,
        background,
        addElement,
        updateElement,
        removeElement,
        setBackgroundImage,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
