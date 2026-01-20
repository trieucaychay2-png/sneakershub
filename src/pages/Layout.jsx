import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = ({ cartCount }) => {
  return (
    <div className="shoe-shop">
      <Header cartCount={cartCount} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;