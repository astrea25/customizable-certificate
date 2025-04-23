import React, { useEffect } from 'react';
import DraggableItem from './DraggableItem';

const Sidebar = () => {
  const headings = [
    { id: 'h1', type: 'h1', content: 'Heading 1', preview: <span className="text-3xl font-bold">H1</span> },
    { id: 'h2', type: 'h2', content: 'Heading 2', preview: <span className="text-2xl font-bold">H2</span> },
    { id: 'h3', type: 'h3', content: 'Heading 3', preview: <span className="text-xl font-bold">H3</span> },
    { id: 'h4', type: 'h4', content: 'Heading 4', preview: <span className="text-lg font-bold">H4</span> },
    { id: 'h5', type: 'h5', content: 'Heading 5', preview: <span className="text-base font-bold">H5</span> },
    { id: 'h6', type: 'h6', content: 'Heading 6', preview: <span className="text-sm font-bold">H6</span> },
  ];

  const paragraphs = [
    { id: 'p-regular', type: 'p-regular', content: 'Regular Text', preview: <span className="text-base">Regular Text</span> },
    { id: 'p-small', type: 'p-small', content: 'Small Text', preview: <span className="text-sm">Small Text</span> },
    { id: 'p-xs', type: 'p-xs', content: 'Extra Small Text', preview: <span className="text-xs">Extra Small Text</span> },
    { id: 'p-large', type: 'p-large', content: 'Large Text', preview: <span className="text-lg">Large Text</span> },
    { id: 'p-xl', type: 'p-xl', content: 'Extra Large Text', preview: <span className="text-xl">Extra Large Text</span> },
  ];

  const specialText = [
    { id: 'p-bold', type: 'p-bold', content: 'Bold Text', preview: <span className="font-bold">Bold Text</span> },
    { id: 'p-italic', type: 'p-italic', content: 'Italic Text', preview: <span className="italic">Italic Text</span> },
    { id: 'p-underline', type: 'p-underline', content: 'Underlined Text', preview: <span className="underline">Underlined Text</span> },
    { id: 'p-strike', type: 'p-strike', content: 'Strikethrough Text', preview: <span className="line-through">Strikethrough Text</span> },
    { id: 'p-color', type: 'p-color', content: 'Colored Text', preview: <span className="text-blue-600">Colored Text</span> },
  ];

  return (
    <aside className="w-64 bg-gray-100 h-full overflow-y-auto border-r border-gray-200">
      <h2 className="text-gray-700 font-medium text-lg p-4 pb-2">Text Components</h2>

      <div className="mb-4">
        <h3 className="text-gray-600 font-medium text-base px-4 py-2 border-t border-b border-gray-200 bg-gray-50">Headings</h3>
        <div className="space-y-1 p-2">
          {headings.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              type={item.type}
              content={item.content}
              preview={item.preview}
              className="flex items-center justify-between px-3 py-2"
            >
              <span className="text-gray-800 font-bold">{item.preview}</span>
              <span className="text-gray-500 text-sm">{item.content}</span>
            </DraggableItem>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-600 font-medium text-base px-4 py-2 border-t border-b border-gray-200 bg-gray-50">Paragraphs</h3>
        <div className="space-y-1 p-2">
          {paragraphs.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              type={item.type}
              content={item.content}
              preview={item.preview}
              className="px-3 py-2"
            >
              {item.preview}
            </DraggableItem>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-600 font-medium text-base px-4 py-2 border-t border-b border-gray-200 bg-gray-50">Special Text</h3>
        <div className="space-y-1 p-2">
          {specialText.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              type={item.type}
              content={item.content}
              preview={item.preview}
              className="px-3 py-2"
            >
              {item.preview}
            </DraggableItem>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
