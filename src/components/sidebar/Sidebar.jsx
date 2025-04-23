import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 h-full overflow-y-auto border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Text Components</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 border-b pb-1 border-gray-300">Headings</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 flex items-center">
            <span className="text-3xl font-bold mr-2">H1</span>
            <span className="text-xs text-gray-500">Heading 1</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 flex items-center">
            <span className="text-2xl font-bold mr-2">H2</span>
            <span className="text-xs text-gray-500">Heading 2</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 flex items-center">
            <span className="text-xl font-bold mr-2">H3</span>
            <span className="text-xs text-gray-500">Heading 3</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 flex items-center">
            <span className="text-lg font-bold mr-2">H4</span>
            <span className="text-xs text-gray-500">Heading 4</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 flex items-center">
            <span className="text-base font-bold mr-2">H5</span>
            <span className="text-xs text-gray-500">Heading 5</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 flex items-center">
            <span className="text-sm font-bold mr-2">H6</span>
            <span className="text-xs text-gray-500">Heading 6</span>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 border-b pb-1 border-gray-300">Paragraphs</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="text-base">Regular Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="text-sm">Small Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="text-xs">Extra Small Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="text-lg">Large Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="text-xl">Extra Large Text</span>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 border-b pb-1 border-gray-300">Special Text</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="font-bold">Bold Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="italic">Italic Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="underline">Underlined Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="line-through">Strikethrough Text</span>
          </li>
          <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
            <span className="text-blue-600">Colored Text</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
