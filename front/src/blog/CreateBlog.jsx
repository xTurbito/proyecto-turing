import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const URL = 'http://localhost:8000/blogs/';

const CompCreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);  
    const [idVendedor, setIdVendedor] = useState('');
    const navigate = useNavigate();

    // Obtener el id del vendedor al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);  
            setIdVendedor(decoded.id); 
        } else {
            alert('Token no encontrado. Por favor, inicie sesión.');
            navigate('/login');
        }
    }, [navigate]);

    // Guardar un registro
    const store = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión.');
            navigate('/login');
            return;
        }

        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('price', price);
        formData.append('image', image);  
        formData.append('idVendedor', idVendedor);

        try {
            await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Importante para manejar archivos
                    Authorization: `Bearer ${token}`  // Incluir el token en los encabezados
                }
            });
            navigate('/blogs');
        } catch (error) {
            console.error('Error al crear el blog:', error.response ? error.response.data : error);
            alert('Error al crear el blog');
        }
    };

    return (
        <div className="card contenedor mt-5">
            <div className="card-body">
                <h3 className="card-title">Crear un Blog</h3>
                <form onSubmit={store}>
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
                        <label className="form-label">Precio</label>
                        <input 
                            className="form-control" 
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input 
                            type="file" 
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}  // Captura el archivo
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

                    <button type="submit" className="btn btn-dark">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default CompCreateBlog;
