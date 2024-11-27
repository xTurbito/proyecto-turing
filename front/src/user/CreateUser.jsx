import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:8000/users/';
const ROLES_URL = 'http://localhost:8000/roles/';

const CompCreateUser = () => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idRol, setIdRol] = useState('');
  const [roles, setRoles] = useState([]);  
  const navigate = useNavigate();


  useEffect(() => {
    getRoles();
  }, []);

  // Función para obtener los roles
  const getRoles = async () => {
    try {
      const res = await axios.get(ROLES_URL);
      setRoles(res.data); 
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  // Función para guardar el usuario
  const store = async (e) => {
    e.preventDefault();

    // Obtener el token de localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token existe
    if (!token) {
      alert('Token no encontrado. Por favor, inicie sesión.');
      navigate('/login');  // Redirigir al login si no hay token
      return;
  }

  try {
    await axios.post(URL, { name, lastname, email, password, idRol },
      {
        headers: {
          Authorization: `Bearer ${token}`  // Incluir el token en los encabezados
        }
      }
    );
    navigate('/users');
  } catch (error) {
    console.error('Error al crear el usuario:', error.response ? error.response.data : error);
            alert('Error al crear el usuario');
  }

  };

  return (
    <div className="container mt-5 contenedor">
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Crear un Usuario</h3>
          <form onSubmit={store}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-control"
                value={idRol}
                onChange={(e) => setIdRol(e.target.value)}
              >
                <option value="">Selecciona un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">Guardar Usuario</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompCreateUser;
