import React, { useState, useRef, useEffect } from 'react';
import { useCertificate } from '../../context/CertificateContext';

const SimpleCertificateElement = ({ element }) => {
  const { updateElement, removeElement } = useCertificate();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  // Log the element position for debugging
  useEffect(() => {
    console.log(`Element ${element.id} position:`, element.position);
    
    // Get the actual DOM position after rendering
    setTimeout(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const paperRect = document.querySelector('.certificate-paper').getBoundingClientRect();
        console.log(`Element ${element.id} actual DOM position:`, {
          left: rect.left - paperRect.left,
          top: rect.top - paperRect.top
        });
      }
    }, 100);
  }, [element.id, element.position]);

  const handleMouseDown = (e) => {
    // Only handle left mouse button
    if (e.button !== 0) return;
    
    setIsDragging(true);
    
    // Calculate the offset between mouse position and element position
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Prevent text selection during drag
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Get the paper element's bounding box
    const paperRect = document.querySelector('.certificate-paper').getBoundingClientRect();
    
    // Calculate new position relative to the paper
    const newX = e.clientX - paperRect.left - dragOffset.x;
    const newY = e.clientY - paperRect.top - dragOffset.y;
    
    // Update the element position
    updateElement(element.id, {
      position: { x: newX, y: newY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse move and mouse up event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const style = {
    position: 'absolute',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 1000 : 20,
    userSelect: 'none'
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
      ref={elementRef}
      style={style}
      onMouseDown={handleMouseDown}
      className="draggable-element"
      data-element-id={element.id}
    >
      {renderElement()}
    </div>
  );
};

export default SimpleCertificateElement;
