import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, type, content, className, preview, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type,
      content,
      preview
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded shadow-sm cursor-pointer hover:bg-gray-50 ${className || ''}`}
    >
      {children || preview}
    </div>
  );
};

export default DraggableItem;
