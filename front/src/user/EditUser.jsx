import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URL = 'http://localhost:8000/users/';
const ROLES_URL = 'http://localhost:8000/roles/';

const CompEditUser = () => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idRol, setIdRol] = useState('');
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserId();
        getRoles();
    }, []);

    // Obtener usuario por ID
    const getUserId = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }

        try {
            const res = await axios.get(URL + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setName(res.data.name);
            setLastName(res.data.lastname);
            setEmail(res.data.email);
            setIdRol(res.data.idRol);
        } catch (error) {
            console.error('Error al obtener el usuario:', error.response ? error.response.data : error);
        }
    };

    // Obtener todos los roles
    const getRoles = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('Token no encontrado. Por favor, inicie sesión');
            navigate('/login');
            return;
        }
    
        try {
            const res = await axios.get(ROLES_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRoles(res.data);
        } catch (error) {
            console.error('Error al obtener los roles:', error.response ? error.response.data : error);
        }
    };

    // Actualizar usuario
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

        const updatedUser = {
            name,
            lastname,
            email,
            idRol,
        };

        // Solo incluir la contraseña si el usuario ingresó una nueva
        if (password.trim()) {
            updatedUser.password = password;
        }

        try {
            await axios.put(URL + id, updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/users');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className="card contenedor mt-5">
            <div className="card-body">
                <h3>Editar Usuario</h3>
                <form onSubmit={update}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nueva Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Dejar en blanco para no cambiar"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rol</label>
                        <select
                            className="form-control"
                            value={idRol}
                            onChange={(e) => setIdRol(e.target.value)}
                        >
                            <option value="">Selecciona un rol</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
                </form>
            </div>
        </div>
    );
};

export default CompEditUser;
