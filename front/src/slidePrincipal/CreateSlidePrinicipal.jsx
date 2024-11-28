import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = 'http://localhost:8000/slide-principal/';

const CompCreateSlidePrincipal = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    // Guardar un registro
    const store = async (e) => {
        e.preventDefault();

        // Validación
        if (!name || !image) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión.');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        try {
            await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  
                    Authorization: `Bearer ${token}`,  
                }
            });
            navigate('/slide-principal'); 
        } catch (error) {
            console.error('Error al crear el slide:', error.response ? error.response.data : error);
            alert('Error al crear el slide');
        }
    };

    return (
        <div className="container mt-4 d-flex justify-content-center ">
            <div className="card shadow-sm col-md-8 col-12">
                <div className="card-header bg-dark text-white">
                    <h3 className="mb-0 text-center">Crear Slide Principal</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={store} className="needs-validation" noValidate>
                        {/* Nombre */}
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                placeholder="Ingrese el nombre del slide"
                                required
                            />
                            <div className="invalid-feedback">
                                Este campo es obligatorio.
                            </div>
                        </div>
        
                        {/* Imagen */}
                        <div className="mb-4">
                            <label htmlFor="image" className="form-label">Imagen</label>
                            <input
                                id="image"
                                type="file"
                                className="form-control"
                                onChange={(e) => setImage(e.target.files[0])} // Captura el archivo
                                required
                            />
                            <div className="invalid-feedback">
                                Debes seleccionar una imagen.
                            </div>
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

export default CompCreateSlidePrincipal;
