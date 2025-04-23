import React from 'react';
import { sidebarItems } from '../../data/sidebarItems';

const SimpleSidebar = ({ onDragStart }) => {
  const handleDragStart = (event, item) => {
    // Set the drag data
    event.dataTransfer.setData('text/plain', JSON.stringify(item));

    // Call the onDragStart callback
    onDragStart(item);
  };

  // Group items by category
  const headings = sidebarItems.filter(item => item.type.startsWith('h'));
  const paragraphs = sidebarItems.filter(item =>
    item.type.startsWith('p-') &&
    !['p-bold', 'p-italic', 'p-underline', 'p-strike', 'p-color'].includes(item.type)
  );
  const specialText = sidebarItems.filter(item =>
    ['p-bold', 'p-italic', 'p-underline', 'p-strike', 'p-color'].includes(item.type)
  );

  // Render a draggable item
  const renderItem = (item) => {
    let content = item.content;
    let className = "px-3 py-2 bg-white rounded shadow-sm cursor-move hover:bg-gray-50 mb-2";

    // Special rendering for headings
    if (item.type.startsWith('h')) {
      const level = item.type.substring(1);
      return (
        <div
          key={item.type}
          className={`${className} flex items-center justify-between`}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}
        >
          <span className="text-gray-800 font-bold">H{level}</span>
          <span className="text-gray-500 text-sm">{item.content}</span>
        </div>
      );
    }

    // Special rendering for styled text
    if (item.type === 'p-bold') {
      content = <span className="font-bold">{item.content}</span>;
    } else if (item.type === 'p-italic') {
      content = <span className="italic">{item.content}</span>;
    } else if (item.type === 'p-underline') {
      content = <span className="underline">{item.content}</span>;
    } else if (item.type === 'p-strike') {
      content = <span className="line-through">{item.content}</span>;
    } else if (item.type === 'p-color') {
      content = <span className="text-blue-600">{item.content}</span>;
    }

    return (
      <div
        key={item.type}
        className={className}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, item)}
      >
        {content}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-gray-100 h-full overflow-y-auto border-r border-gray-200">
      <h2 className="text-gray-700 font-medium text-lg p-4 pb-2">Text Components</h2>

      <div className="mb-4">
        <h3 className="text-gray-600 font-medium text-base px-4 py-2 border-t border-b border-gray-200 bg-gray-50">Headings</h3>
        <div className="p-2">
          {headings.map(renderItem)}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-600 font-medium text-base px-4 py-2 border-t border-b border-gray-200 bg-gray-50">Paragraphs</h3>
        <div className="p-2">
          {paragraphs.map(renderItem)}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-600 font-medium text-base px-4 py-2 border-t border-b border-gray-200 bg-gray-50">Special Text</h3>
        <div className="p-2">
          {specialText.map(renderItem)}
        </div>
      </div>
    </aside>
  );
};

export default SimpleSidebar;
