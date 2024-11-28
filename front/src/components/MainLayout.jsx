import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../css/globales.css';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header className="" />
      <main className="d-flex flex-column min-vh-100">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
