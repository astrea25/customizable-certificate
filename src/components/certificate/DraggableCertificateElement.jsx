import React, { useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useCertificate } from '../../context/CertificateContext';

const DraggableCertificateElement = ({ element }) => {
  const { updateElement, removeElement } = useCertificate();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `canvas-element-${element.id}`,
    data: {
      type: 'canvas-element',
      elementId: element.id,
      element
    }
  });

  useEffect(() => {
    // Element rendered
  }, [element]);

  // Log the element position for debugging
  useEffect(() => {
    console.log(`Element ${element.id} position:`, element.position);

    // Get the actual DOM position after rendering
    setTimeout(() => {
      const node = document.querySelector(`[data-element-id="${element.id}"]`);
      if (node) {
        const rect = node.getBoundingClientRect();
        const paperRect = document.querySelector('.certificate-paper').getBoundingClientRect();
        console.log(`Element ${element.id} actual DOM position:`, {
          left: rect.left - paperRect.left,
          top: rect.top - paperRect.top,
          expectedLeft: element.position.x,
          expectedTop: element.position.y,
          difference: {
            x: rect.left - paperRect.left - element.position.x,
            y: rect.top - paperRect.top - element.position.y
          }
        });
      }
    }, 100);
  }, [element.id, element.position]);

  const style = {
    position: 'absolute',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: 'move',
    zIndex: isDragging ? 1000 : 20,
    pointerEvents: 'auto',
    touchAction: 'none', // Prevent scrolling while dragging on touch devices
    opacity: isDragging ? 0.5 : 1,
  };

  const renderElement = () => {
    switch (element.type) {
      case 'h1':
        return <h1 className="text-8xl font-black tracking-wider text-black">{element.content}</h1>;
      case 'h2':
        return <h2 className="text-6xl font-bold tracking-wider text-black">{element.content}</h2>;
      case 'h3':
        return <h3 className="text-4xl font-bold tracking-wider text-black">{element.content}</h3>;
      case 'h4':
        return <h4 className="text-3xl font-bold tracking-wider text-black">{element.content}</h4>;
      case 'h5':
        return <h5 className="text-2xl font-bold tracking-wider text-black">{element.content}</h5>;
      case 'h6':
        return <h6 className="text-xl font-bold tracking-wider text-black">{element.content}</h6>;
      case 'p-regular':
        return <p className="text-base text-black">{element.content}</p>;
      case 'p-small':
        return <p className="text-sm text-black">{element.content}</p>;
      case 'p-xs':
        return <p className="text-xs text-black">{element.content}</p>;
      case 'p-large':
        return <p className="text-lg text-black">{element.content}</p>;
      case 'p-xl':
        return <p className="text-xl text-black">{element.content}</p>;
      case 'p-bold':
        return <p className="font-bold text-black">{element.content}</p>;
      case 'p-italic':
        return <p className="italic text-black">{element.content}</p>;
      case 'p-underline':
        return <p className="underline text-black">{element.content}</p>;
      case 'p-strike':
        return <p className="line-through text-black">{element.content}</p>;
      case 'p-color':
        return <p className="text-blue-600">{element.content}</p>;
      default:
        return <p className="text-black">{element.content}</p>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="draggable-element"
      data-element-id={element.id}
    >
      {renderElement()}
    </div>
  );
};

export default DraggableCertificateElement;
