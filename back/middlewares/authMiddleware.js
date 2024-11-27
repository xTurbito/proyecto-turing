import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {                                                                                                                                                       
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Verifica si el token incluye el id del usuario
        if (!decoded.id) {
            return res.status(401).json({ message: 'Token inválido: Falta información del usuario' });
        }

        // Almacena la información decodificada en la solicitud para uso posterior en controladores
        req.user = decoded;

        // Continúa con el siguiente middleware o controlador
        next();  
    } catch (error) {
        // Si el token no es válido o ha expirado
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export default authMiddleware;
