import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import path from 'path';  

// Importar conexión a la base de datos
import db from './database/db.js';

// Importar rutas
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import rolRoutes from './routes/rolRoutes.js';
import authRoutes from './routes/authRoutes.js'; 

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = new URL('.', import.meta.url).pathname;


app.use('/uploads', express.static(path.join('public', 'uploads')));

// Usar las rutas
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);
app.use('/roles', rolRoutes);
app.use('/auth', authRoutes); 

// Intentar la conexión a la base de datos
try {
  await db.authenticate();
  console.log('Conexión a la db exitosa');
} catch (error) {
  console.log(`El error de conexión es: ${error}`);
}

app.listen(8000, () => {
  console.log('Server corriendo en http://localhost:8000/');
});
