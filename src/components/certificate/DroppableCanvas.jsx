import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useCertificate } from '../../context/CertificateContext';

const DroppableCanvas = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'certificate-canvas',
  });

  useEffect(() => {
    // DroppableCanvas initialized
  }, []);

  useEffect(() => {
    // Track when element is over the canvas
  }, [isOver]);

  return (
    <div
      ref={setNodeRef}
      className="relative w-full h-full"
      style={{
        outline: isOver ? '2px dashed blue' : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default DroppableCanvas;
