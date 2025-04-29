import React, { useState, useRef, useEffect } from 'react';
import { useCertificate } from '../../context/CertificateContext';

const SimpleCertificateElement = ({ element }) => {
  const { updateElement, removeElement } = useCertificate();
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [editContent, setEditContent] = useState(element.content);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const inputRef = useRef(null);

  // Update editContent when element.content changes
  useEffect(() => {
    setEditContent(element.content);
  }, [element.content]);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleMouseDown = (e) => {
    // Don't initiate drag if we're editing
    if (isEditing) return;

    // Only handle left mouse button
    if (e.button !== 0) return;

    // Set this element as selected
    setIsSelected(true);

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

  // Handle click outside to deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the click is on a delete button (has a parent with the delete-button class)
      const isDeleteButtonClick = e.target.closest('.delete-button');

      if (isDeleteButtonClick) {
        return;
      }

      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [element.id]);

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
    // Keep the element selected after dragging
    setIsSelected(true);
  };

  // Handle double click to enter edit mode
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsSelected(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setEditContent(e.target.value);
  };

  // Handle key press in the input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Save changes and exit edit mode
      updateElement(element.id, { content: editContent });
      setIsEditing(false);
      // Keep the element selected after editing
      setIsSelected(true);
    } else if (e.key === 'Escape') {
      // Cancel editing and revert to original content
      setEditContent(element.content);
      setIsEditing(false);
      // Keep the element selected after canceling edit
      setIsSelected(true);
    }
  };

  // Handle blur event to save changes when clicking outside
  const handleBlur = () => {
    updateElement(element.id, { content: editContent });
    setIsEditing(false);
    // Keep the element selected after editing
    setIsSelected(true);
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
    cursor: isDragging ? 'grabbing' : (isEditing ? 'text' : 'grab'),
    zIndex: isDragging || isEditing ? 1000 : 20,
    userSelect: isEditing ? 'text' : 'none',
    minWidth: '50px',
    minHeight: '20px'
  };

  // Get the appropriate class based on element type
  const getElementClass = (type) => {
    switch (type) {
      case 'h1':
        return "text-8xl font-black tracking-wider text-black";
      case 'h2':
        return "text-6xl font-bold tracking-wider text-black";
      case 'h3':
        return "text-4xl font-bold tracking-wider text-black";
      case 'h4':
        return "text-3xl font-bold tracking-wider text-black";
      case 'h5':
        return "text-2xl font-bold tracking-wider text-black";
      case 'h6':
        return "text-xl font-bold tracking-wider text-black";
      case 'p-regular':
        return "text-base text-black";
      case 'p-small':
        return "text-sm text-black";
      case 'p-xs':
        return "text-xs text-black";
      case 'p-large':
        return "text-lg text-black";
      case 'p-xl':
        return "text-xl text-black";
      case 'p-bold':
        return "font-bold text-black";
      case 'p-italic':
        return "italic text-black";
      case 'p-underline':
        return "underline text-black";
      case 'p-strike':
        return "line-through text-black";
      case 'p-color':
        return "text-blue-600";
      default:
        return "text-black";
    }
  };

  const renderElement = () => {
    if (isEditing) {
      return (
        <input
          ref={inputRef}
          type="text"
          value={editContent}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`bg-transparent outline-none border border-blue-400 px-1 w-full ${getElementClass(element.type)}`}
          style={{ minWidth: '100px' }}
        />
      );
    }

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
    <div className="relative">
      <div
        ref={elementRef}
        style={style}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        className={`draggable-element ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
        data-element-id={element.id}
      >
        {renderElement()}

        {/* Delete button positioned on the corner of the component itself, only visible when selected */}
        {isSelected && !isEditing && !isDragging && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              // Make sure to stop propagation and prevent default
              e.stopPropagation();
              e.preventDefault();

              // Try with a small delay to ensure event handling is complete
              setTimeout(() => {
                try {
                  removeElement(element.id);
                } catch (error) {
                  // Silent error handling
                }
              }, 0);
            }}
            className="delete-button absolute top-0 right-0 bg-red-500 text-white rounded-tr-md rounded-bl-md w-6 h-6 flex items-center justify-center
                     hover:bg-red-600 focus:outline-none shadow-md z-50 text-lg font-bold"
            title="Delete element"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleCertificateElement;
