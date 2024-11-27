import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';
import dotenv from 'dotenv';


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// Lógica de inicio de sesión
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar al usuario en la base de datos
      const user = await UserModel.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });
  
      // Generar el token JWT
      const token = jwt.sign({ id: user.id, email: user.email, sessionStart: Date.now() }, SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };