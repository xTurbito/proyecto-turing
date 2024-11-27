import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 


const Header = () => {
  const navigate = useNavigate();

  // Verificar si el usuario tiene un token de autenticación
  const token = localStorage.getItem('token');

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');

    navigate('/login');  
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/"><i className="fa-solid fa-house"></i></Link> 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link> 
            </li>

            {!token && (
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Login">Login</Link> 
            </li>
            )}
        
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link> 
              </li>
            )}
           
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">Usuarios</Link> 
              </li>
            )}
          
            {token && (
              <li className="nav-item">
                <a className='nav-link' onClick={handleLogout}>Cerrar Sesión</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
