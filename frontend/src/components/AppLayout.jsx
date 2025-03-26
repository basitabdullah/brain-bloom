import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

function AppLayout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {children}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default AppLayout; 