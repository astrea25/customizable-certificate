import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customizable Certificate</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                New Certificate
              </button>
            </li>
            <li>
              <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                Save
              </button>
            </li>
            <li>
              <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                Export
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
