import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Corregir la URL
const URL = "http://localhost:8000/auth/login/";

const CompLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, { email, password });

      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/blogs');
    } catch (error) {
      setErrorMessage('Credenciales incorrectas o error en el servidor');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Iniciar sesión</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompLogin;
