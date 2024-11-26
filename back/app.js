import express from 'express'
import cors from 'cors'

// Importar conexión db
import db from './database/db.js'

// Importar rutas
import blogRoutes from './routes/blogRoutes.js'
import userRoutes from './routes/userRoutes.js'
import rolRoutes from './routes/rolRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())


app.use('/blogs', blogRoutes) 
app.use('/users', userRoutes) 
app.use('/roles', rolRoutes)

try {
    await db.authenticate()
    console.log('Conexión a la db exitosa')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.listen(8000, () => {
    console.log('Server corriendo en http://localhost:8000/')
})
