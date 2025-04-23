import React, { useEffect } from 'react';
import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';

const DragOverlay = ({ activeId, activeData }) => {
  useEffect(() => {
    // Track active drag overlay
  }, [activeId, activeData]);

  if (!activeId) return null;

  return (
    <DndDragOverlay>
      {activeData && (
        <div className="p-2 bg-white rounded shadow opacity-80">
          {activeData.preview}
        </div>
      )}
    </DndDragOverlay>
  );
};

export default DragOverlay;
