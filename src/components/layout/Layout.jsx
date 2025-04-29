import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Sidebar from '../sidebar/Sidebar';
import Canvas from '../certificate/Canvas';
import { useCertificate } from '../../context/CertificateContext';

const SimpleLayout = ({ children }) => {
  const { addElement } = useCertificate();
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (event) => {
    if (!draggedItem) return;

    const canvas = document.querySelector('.certificate-canvas-container');
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    if (x >= 0 && x <= canvasRect.width && y >= 0 && y <= canvasRect.height) {
      addElement({
        id: uuidv4(),
        type: draggedItem.type,
        content: draggedItem.content,
        position: { x, y },
      });
    }

    setDraggedItem(null);
  };

  useEffect(() => {
    const canvas = document.querySelector('.certificate-canvas-container');
    if (!canvas) return;

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);

    return () => {
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('drop', handleDrop);
    };
  }, [draggedItem]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onDragStart={handleDragStart} />
        <main className="flex-1 overflow-auto">
          {children || <Canvas />}
        </main>
      </div>
    </div>
  );
};

export default SimpleLayout;
