import React, { useEffect, useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Sidebar from '../sidebar/Sidebar';
import Canvas from '../certificate/Canvas';
import DragOverlay from '../dnd/DragOverlay';
import { useCertificate } from '../../context/CertificateContext';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

const Layout = ({ children }) => {
  const { addElement, updateElement } = useCertificate();
  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    // Component mounted
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setActiveData(event.active.data.current);
  };

  const handleDragEnd = (event) => {
    const { active, over, activatorEvent } = event;

    // Only proceed if we're dropping over the certificate canvas
    if (!over || over.id !== 'certificate-canvas') {
      setActiveId(null);
      setActiveData(null);
      return;
    }

    // Get mouse position
    const mouseX = activatorEvent.clientX;
    const mouseY = activatorEvent.clientY;

    // Get the paper element's bounding box (this is our actual canvas)
    const paper = document.querySelector('.certificate-paper');
    if (!paper) return;

    const paperRect = paper.getBoundingClientRect();

    // Calculate the position relative to the paper
    // For now, let's use a fixed position in the center of the certificate
    const relativeX = paperRect.width / 2;
    const relativeY = paperRect.height / 2;

    console.log('Drag end calculations:');
    console.log('- Mouse position:', { mouseX, mouseY });
    console.log('- Paper rect:', { left: paperRect.left, top: paperRect.top });
    console.log('- Relative position:', { relativeX, relativeY });

    // Check if this is a canvas element being dragged (already on the canvas)
    if (active.data.current?.type === 'canvas-element') {
      const elementId = active.data.current.elementId;

      console.log('Moving existing element:', elementId);

      // Update the element position
      updateElement(elementId, {
        position: { x: relativeX, y: relativeY }
      });
    }
    // This is a sidebar element being dragged onto the canvas
    else {
      // Add the element to the certificate
      const newElementId = uuidv4();

      console.log('Adding new element:', newElementId);

      addElement({
        id: newElementId,
        type: active.data.current.type,
        content: active.data.current.content,
        position: { x: relativeX, y: relativeY },
      });

      // After a short delay, check the actual position of the element
      setTimeout(() => {
        const elementNode = document.querySelector(`[data-element-id="${newElementId}"]`);
        if (elementNode) {
          const rect = elementNode.getBoundingClientRect();
          console.log('- Actual element position in DOM:', {
            left: rect.left - paperRect.left,
            top: rect.top - paperRect.top
          });
        }
      }, 100);
    }

    setActiveId(null);
    setActiveData(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={(event) => {}}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children || <Canvas />}
          </main>
        </div>
        <DragOverlay activeId={activeId} activeData={activeData} />
      </div>
    </DndContext>
  );
};

export default Layout;
