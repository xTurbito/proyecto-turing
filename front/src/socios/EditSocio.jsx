import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URL = 'http://localhost:8000/socios/';

const CompEditSocio = () => {
    const [name, setName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (!name || !subtitle || !descripcion) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('subtitle', subtitle);
        formData.append('descripcion', descripcion);
        if (image) formData.append('image', image);

        try {
            await axios.put(URL + id, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/socios');
        } catch (error) {
            console.error('Error al actualizar al socio:', error);
            alert(`Hubo un error al actualizar al socio: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        getSocioById();  // Llama a la función para obtener los datos del socio
    }, [id, navigate]);

    const getSocioById = async () => {
        try {
            const res = await axios.get(URL + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setName(res.data.name);
            setSubtitle(res.data.subtitle);
            setDescripcion(res.data.descripcion);
            setCurrentImage(`http://localhost:8000${res.data.image}`);
        } catch (error) {
            console.error('Error al obtener al socio:', error);
            alert('No se pudo obtener al socio');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="card shadow-sm col-md-8 col-12">
                <div className="card-header bg-dark text-white">
                    <h3 className="mb-0 text-center">Editar Socio</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={update} className="needs-validation" noValidate>
                        {/* Nombre */}
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                placeholder="Ingrese el nombre del socio"
                                required
                            />
                            <div className="invalid-feedback">
                                Este campo es obligatorio.
                            </div>
                        </div>

                        {/* Subtítulo */}
                        <div className="mb-4">
                            <label htmlFor="subtitle" className="form-label">Subtítulo</label>
                            <input
                                id="subtitle"
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="form-control"
                                placeholder="Ingrese el subtítulo del socio"
                                required
                            />
                            <div className="invalid-feedback">
                                Este campo es obligatorio.
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="mb-4">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="form-control"
                                placeholder="Ingrese la descripción del socio"
                                required
                                maxLength={100}
                            />
                            <div className="invalid-feedback">
                                Este campo es obligatorio.
                            </div>
                        </div>
        
                        {/* Imagen */}
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Imagen</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="image" 
                                onChange={handleImageChange}
                            />
                            {currentImage && (
                                <div className="mt-3">
                                    <img src={currentImage} alt="Imagen actual" style={{ width: '200px', height: 'auto' }} />
                                </div>
                            )}
                        </div>
        
                        {/* Botón de Guardar */}
                        <button type="submit" className="btn btn-dark ">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompEditSocio;
