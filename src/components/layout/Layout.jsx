import React from 'react';
import Header from './Header';
import Sidebar from '../sidebar/Sidebar';
import Canvas from '../certificate/Canvas';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children || <Canvas />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
