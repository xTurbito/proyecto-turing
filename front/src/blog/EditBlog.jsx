import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URL = 'http://localhost:8000/blogs/';

const CompEditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);  
    const [imagePreview, setImagePreview] = useState(null);  
    const [existingImage, setExistingImage] = useState(null);  
    const navigate = useNavigate();
    const { id } = useParams();

    // Actualizar
    const update = async (e) => {
        e.preventDefault();

        // Obtener el token
        const token = localStorage.getItem('token');

        // Verificar si existe el token
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        
        // Solo añadir la imagen si existe una nueva imagen
        if (image) formData.append('image', image);  

        try {
            // Actualizar el blog con el token
            await axios.put(URL + id, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',  
                },
            });

            navigate('/blogs');
        } catch (error) {
            console.error('Error al actualizar el blog:', error);
            alert(`Hubo un error al actualizar el blog: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    useEffect(() => {
        // Verificar token antes de cargar los datos del blog
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        getBlogById();
    }, [id, navigate]);

    const getBlogById = async () => {
        try {
            const res = await axios.get(URL + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTitle(res.data.title);
            setContent(res.data.content);
            // Establecer la vista previa de la imagen si ya existe
            if (res.data.imageUrl) {
                setExistingImage(`http://localhost:8000${res.data.imageUrl}`);  
            }
        } catch (error) {
            console.error('Error al obtener el blog:', error);
            alert('No se pudo obtener el blog');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        // Generar una vista previa de la imagen seleccionada
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);  
        }
    };

    return (
        <div className="card contenedor mt-3">
            <div className="card-body">
                <h3 className="card-title">Editar un Blog</h3>
                <form onSubmit={update} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contenido</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                    </div>

                    {imagePreview && (
                        <div className="mb-3">
                            <label className="form-label">Vista previa de la imagen</label>
                            <img
                                src={imagePreview}
                                alt="Vista previa"
                                style={{ width: '100px', height: 'auto' }}
                                className="img-thumbnail"
                            />
                        </div>
                    )}
                    {existingImage && !imagePreview && (
                        <div className="mb-3">
                            <label className="form-label">Imagen Actual</label>
                            <img
                                src={existingImage}
                                alt="Imagen actual"
                                style={{ width: '100px', height: 'auto' }}
                                className="img-thumbnail"
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default CompEditBlog;
