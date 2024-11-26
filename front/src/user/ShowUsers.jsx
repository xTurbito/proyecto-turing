import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const URL = 'http://localhost:8000/users/';
const ROLES_URL = 'http://localhost:8000/roles/'; 

const CompShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  // Obtener todos los usuarios
  const getUsers = async () => {
    const res = await axios.get(URL);
    setUsers(res.data);
    setFilteredUsers(res.data);
  };

  // Obtener todos los roles
  const getRoles = async () => {
    const res = await axios.get(ROLES_URL);
    setRoles(res.data);
  };

  // Eliminar un usuario
  const deleteUser = async (id) => {
    await axios.delete(`${URL}${id}`);
    getUsers();
  };

  // Función de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.lastname.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filteredData);
  };

  // Obtener el nombre del rol basado en el id
  const getRoleName = (id) => {
    const role = roles.find(role => role.id === id);
    return role ? role.name : 'Desconocido'; 
  };

  // Columnas de la DataTable
  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Apellidos',
      selector: row => row.lastname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: row => getRoleName(row.idRol), 
      sortable: true,
    },
    {
      name: 'Fecha Registro',
      selector: row => row.createdAt,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Link to={`/edit-user/${row.id}`} className='btn btn-info btn-sm me-2'>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <button onClick={() => deleteUser(row.id)} className='btn btn-danger btn-sm'>
            <i className="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className='container mt-4'>
      <div className='card shadow-sm'>
        <div className='card-header bg-primary text-white'>
          <h3 className='mb-0'>Gestión de Usuarios</h3>
        </div>
        <div className='card-body'>
          <div className='d-flex justify-content-between mb-3'>
            <Link to="/create-user" className='btn btn-success'>
              <i className="fa-solid fa-plus me-1"></i> Crear Usuario
            </Link>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
              className='form-control w-25'
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            className='table-responsive'
          />
        </div>
      </div>
    </div>
  );
};

export default CompShowUsers;
