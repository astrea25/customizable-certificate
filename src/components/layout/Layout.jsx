import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Sidebar from '../sidebar/SimpleSidebar';
import Canvas from '../certificate/Canvas';
import { useCertificate } from '../../context/CertificateContext';

const SimpleLayout = ({ children }) => {
  const { addElement } = useCertificate();
  const [draggedItem, setDraggedItem] = useState(null);

  // Handle when an item is dragged from the sidebar
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  // Handle when an item is dropped on the canvas
  const handleDrop = (event) => {
    if (!draggedItem) return;

    // Get the canvas element
    const canvas = document.querySelector('.certificate-paper');
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    // Calculate position relative to the canvas
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    // Only add the element if the drop position is within the canvas
    if (x >= 0 && x <= canvasRect.width && y >= 0 && y <= canvasRect.height) {
      // Add the element to the certificate
      addElement({
        id: uuidv4(),
        type: draggedItem.type,
        content: draggedItem.content,
        position: { x, y },
      });
    }

    // Reset the dragged item
    setDraggedItem(null);
  };

  // Add event listeners for drop events
  useEffect(() => {
    const canvas = document.querySelector('.certificate-canvas-container');
    if (!canvas) return;

    const handleDragOver = (event) => {
      // Prevent default to allow drop
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
