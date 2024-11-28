import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';


const URL = 'http://localhost:8000/socios/';

const CompShowSocios = () => {
    const [socios, setSocios] = useState([]);
    const [filteredSocios, setFilteredSocios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Obtener token de localStorage 
    const token = localStorage.getItem('token');

    useEffect(() => {
    getSocios();
    }, []);

    const getSocios = async () => {
        if (!token) {
            console.error('Token no encontrado');
            navigate('/login');
            return;
        }
        try {
            const res = await axios.get(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });   
            setSocios(res.data);
            setFilteredSocios(res.data);
        } catch (error) {
            console.error('Error al obtener los socios:', error.response ? error.response.data : error.message);
        }
    }

      //Eliminar un socio
      const deleteSocio = async(id) => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          console.error('Token no encontrado');
          navigate('/login');  // Redirigir al login si no hay token
          return;
        }
    
    
        try {
          await axios.delete(`${URL}${id}` , {
            headers: {
              Authorization: `Bearer ${token}`,  // Enviar el token en el encabezado Authorization
            },
          });
          getSocios();
        } catch (error) {
          console.error('Error al eliminar al socio:', error.response ? error.response.data : error);
        }
      }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filteredData = socios.filter(socios =>
          socios.name.toLowerCase().includes(term) ||
          socios.image.toLowerCase().includes(term)
        );
        setFilteredSocios(filteredData);
      };

      const columns = [
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Imagen',
            selector: row => row.image,
            cell: row => {
                const imageUrl = row.image ? `http://localhost:8000${row.image}` : 'ruta_por_defecto';
                return (
                    <img
                        src={imageUrl}
                        alt={row.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                );
            },
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <Link to={`/edit-socio/${row.id}`} className='btn'>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => deleteSocio(row.id)} className='btn'>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </>
            ),
        },
    ];

    return (
        <div className='container mt-4'>
            <div className='card shadow-sm'>
                <div className='card-header bg-dark text-white'>
                    <h3 className='mb-0'>Gestión de Seccion Socios</h3>
                </div>
                <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                        <Link to="/create-socio" className='btn btn-success'>
                            <i className="fa-solid fa-plus me-1"></i> Agregar Socio
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
                        data={filteredSocios}  
                        pagination
                        highlightOnHover
                        className='table-responsive'
                    />
                </div>
            </div>
        </div>
    ); 
}

export default CompShowSocios;