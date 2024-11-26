import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const URL  = 'http://localhost:8000/blogs/'

const CompEditBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const {id} = useParams()

    //Actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URL+id, {
            title: title,
            content: content
        })
        navigate('/blogs')
    }

    useEffect(() => {
        getBlogById()
    }, [])

    const getBlogById = async () => {
       const res = await axios.get(URL+id)
        setTitle(res.data.title)
        setContent(res.data.content)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Editar un Blog</h3>
                <form onSubmit={update}>
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

export default CompEditBlog