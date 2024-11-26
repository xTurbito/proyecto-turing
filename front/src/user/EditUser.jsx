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

    const getUserId = async () => {
        const res = await axios.get(URL + id);
        setName(res.data.name);
        setLastName(res.data.lastname);
        setEmail(res.data.email);
        setIdRol(res.data.idRol);
    };

    const getRoles = async () => {
        const res = await axios.get(ROLES_URL);
        setRoles(res.data);
    };

    const update = async (e) => {
        e.preventDefault();
        const updatedUser = {
            name, 
            lastname, 
            email, 
            idRol
        };
        // Solo incluir la contraseña si el usuario ingresó una nueva
        if (password.trim()) {
            updatedUser.password = password;
        }

        await axios.put(URL + id, updatedUser);
        navigate('/users');
    };

    return (
        <div className="card">
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
