import axios  from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const URL  = 'http://localhost:8000/blogs/'


const CompCreateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    //Guardar un registro
    const store = async (e) => {
        e.preventDefault()

        await axios.post(URL, {title: title, content: content})
        navigate('/blogs')
    } 

    return (
        <div className="card">
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
                        <label className="form-label">Contenido</label>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            className="form-control"
                        />
                    </div>
    
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
}


export default CompCreateBlog