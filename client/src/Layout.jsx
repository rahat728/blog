import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
