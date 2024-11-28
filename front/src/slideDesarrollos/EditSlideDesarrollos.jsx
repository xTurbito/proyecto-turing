import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const URL = 'http://localhost:8000/slide-desarrollos/';

const CompEditSlideDesarrollos = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const update  = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (image) formData.append('image', image);  // Solo agregar imagen si existe

        try {
            await axios.put(URL + id, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/slide-desarrollos');  // Redirigir después de la actualización
        } catch (error) {
            console.error('Error al actualizar el slide:', error);
            alert(`Hubo un error al actualizar el slide: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        getSlideById();
    }, [id, navigate]);

    const getSlideById = async () => {
        try {
            const res = await axios.get(URL + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setName(res.data.name);
            setImage(res.data.image);  // Inicializamos con la imagen actual
            
            const imagePath = res.data.image;
            if (imagePath) {
                setCurrentImage(`http://localhost:8000${imagePath}`); 
            }
        } catch (error) {
            console.error('Error al obtener el slide:', error);
            alert('No se pudo obtener el slide');
        }
    };

    // Manejar el cambio de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="card shadow-sm col-md-8 col-12">
                <div className="card-header bg-dark text-white">
                    <h3 className="mb-0">Editar Slide Desarrollos</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>

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
                                    <img src={currentImage} alt="Imagen actual"  style={{ width: '200px', height: 'auto' }} />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-dark">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompEditSlideDesarrollos;