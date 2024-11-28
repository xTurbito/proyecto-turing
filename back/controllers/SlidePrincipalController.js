import SlidePrincipalModel from "../models/slidePrincipalModel.js"
import multer from "multer"
import path from 'path';
import fs from 'fs';


// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = 'public/uploads/blog/slide_principal';
      // Crear la carpeta si no existe
      if (!fs.existsSync(uploadDir)){
          fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir); // Carpeta de destino para las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
    }
});


const upload = multer({ storage });


//Métodos para CRUD

//Mostrar todos los registros
export const getAllImagesPrincipal = async (req, res) => {
    try {
        const slidePrincipal = await SlidePrincipalModel.findAll();
        
        if(slidePrincipal.image){
            blog.imageUrl = `http://localhost:8000${blog.image}`;
            console.log('URL de la imagen:', blog.imageUrl);
        }
        
        
        res.json(slidePrincipal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Mostrar un registro 
export const getSlidePrincipal = async (req, res) => {
  try {
    const slidePrincipal = await SlidePrincipalModel.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!slidePrincipal) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

    // Asignar URL de la imagen si existe
    if (slidePrincipal.image) {
      slidePrincipal.imageUrl = `http://localhost:8000${slidePrincipal.image}`;
      console.log('URL de la imagen:', slidePrincipal.imageUrl); 
      
      slidePrincipal.imageUrl = null; 
    }

    res.json(slidePrincipal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Crear un registro
export const createSlidePrincipal = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al subir la imagen", error: err.message });
      }
  
      const { name } = req.body;
  
      // Validación del campo 'name'
      if (!name) {
        return res.status(400).json({ message: "El campo 'name' es obligatorio" });
      }
  
      try {
        const imageUrl = req.file ? `/uploads/blog/slide_principal/${req.file.filename}` : null;
  
        // Crear el registro en la base de datos
        await SlidePrincipalModel.create({ name, image: imageUrl });
        res.status(201).json({ message: "Registro creado correctamente" });
      } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
      }
    });
  };
  
//Actualizar un registro
export const updateSlidePrincipal = async (req, res) => {
  try {
    // Buscar el slide por ID
    const slidePrincipal = await SlidePrincipalModel.findOne({ where: { id: req.params.id } });
    if (!slidePrincipal) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

    // Eliminar la imagen anterior del servidor (si existe)
    if (slidePrincipal.image) {
      const imagePath = path.join('public', slidePrincipal.image); // Ruta completa de la imagen
      if (fs.existsSync(imagePath)) { // Verificar si la imagen existe
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen:", err);
            // No retornes aquí; si no se puede eliminar, continúa con la actualización
          } else {
            console.log("Imagen eliminada exitosamente.");
          }
        });
      } else {
        console.log("La imagen no existe en la ruta especificada, no se requiere eliminación.");
      }
    }

    // Proceder con la carga de la nueva imagen
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al subir la imagen", error: err.message });
      }

      // Definir la URL de la imagen (si se carga una nueva)
      const { name } = req.body;
      const imageUrl = req.file ? `/uploads/blog/slide_principal/${req.file.filename}` : slidePrincipal.image;

      // Actualizar el registro en la base de datos
      await SlidePrincipalModel.update(
        { name, image: imageUrl },
        { where: { id: req.params.id } }
      );

      res.json({ message: "Registro actualizado correctamente" });
    });
  } catch (error) {
    console.error("Error en la actualización del slide:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};



//Eliminar un registro
export const deleteSlidePrincipal = async(req, res) => {
  try {
    const slidePrincipal = await SlidePrincipalModel.findOne({
      where: {
        id: req.params.id
      }
    });

    
     if (!slidePrincipal) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

    //Eliminar la imagen del servidor
    if (slidePrincipal.image) {
      const imagePath = path.join('public', slidePrincipal.image); // Ruta completa de la imagen
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        } else {
          console.log("Imagen eliminada exitosamente.");
        }
      });
    }

    //Eliminar el registro de la bd
    await SlidePrincipalModel.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: "Registro y imagen eliminados correctamente" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};