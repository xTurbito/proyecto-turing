import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 ">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Mi Blog. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
