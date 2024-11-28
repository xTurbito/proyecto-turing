import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URL = 'http://localhost:8000/blogs/';

const CompEditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(''); 
    const navigate = useNavigate();
    const { id } = useParams();

    // Actualizar
    const update = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image); 

        try {
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
            
            
            const imagePath = res.data.image; 
            if (imagePath) {
                setCurrentImage(`http://localhost:8000${imagePath}`); 
            }
        } catch (error) {
            console.error('Error al obtener el blog:', error);
            alert('No se pudo obtener el blog');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
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

                    {currentImage && (
                        <div className="mb-3">
                            <label className="form-label">Imagen Actual</label>
                            <img
                                src={currentImage}
                                alt="Imagen actual del blog"
                                className="img-thumbnail mb-2"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default CompEditBlog;
