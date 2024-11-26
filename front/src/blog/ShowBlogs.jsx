import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const URL = 'http://localhost:8000/blogs/';

const CompShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getBlogs();
  }, []);

  // Mostrar todos los blogs
  const getBlogs = async () => {
    const res = await axios.get(URL);
    setBlogs(res.data);
    setFilteredBlogs(res.data);
  };

  // Función de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = blogs.filter(blog =>
      blog.title.toLowerCase().includes(term) ||
      blog.content.toLowerCase().includes(term)
    );
    setFilteredBlogs(filteredData);
  };

  // Columnas de la DataTable
  const columns = [
    {
      name: 'Título',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Contenido',
      selector: row => row.content,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Link to={`/edit-blog/${row.id}`} className='btn btn-info btn-sm me-2'>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <button onClick={() => deleteBlog(row.id)} className='btn btn-danger btn-sm'>
            <i className="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  // Eliminar un blog
  const deleteBlog = async (id) => {
    await axios.delete(`${URL}${id}`);
    getBlogs();
  };

  return (
    <div className='container mt-4'>
      <div className='card shadow-sm'>
        <div className='card-header bg-primary text-white'>
          <h3 className='mb-0'>Gestión de Blogs</h3>
        </div>
        <div className='card-body'>
          <div className='d-flex justify-content-between mb-3'>
            <Link to="/create-blog" className='btn btn-success'>
              <i className="fa-solid fa-plus me-1"></i> Crear Blog
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
            data={filteredBlogs}
            pagination
            highlightOnHover
            className='table-responsive'
          />
        </div>
      </div>
    </div>
  );
};

export default CompShowBlogs;
