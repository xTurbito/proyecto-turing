import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="my-5 contenedor">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;