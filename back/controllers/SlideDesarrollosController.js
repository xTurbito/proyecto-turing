import slideDesarrollosModel from "../models/SlideDesarrollosModel.js";
import multer from "multer"
import path from 'path';
import fs from 'fs';

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = 'public/uploads/blog/slide_desarrollos';
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


//Métodos para el CRUD

//Mostrar todos los registros
export const getAllSlideDesarrollos = async(req, res) => {
    try {
        const slideDesarrollos = await slideDesarrollosModel.findAll();

        res.json(slideDesarrollos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

//Mostrar un registro 
export const getSlideDesarrollo = async(req, res) => {
  try {
    const slideDesarrollos = await slideDesarrollosModel.findOne({
      where: {
        id: req.params.id
      }
    });

    
    if (!slideDesarrollos) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

     // Asignar URL de la imagen si existe
     if (slideDesarrollos.image) {
      slideDesarrollos.imageUrl = `http://localhost:8000${slideDesarrollos.image}`;
      console.log('URL de la imagen:', slideDesarrollos.imageUrl); 
      
      slideDesarrollos.imageUrl = null; 
    }

    res.json(slideDesarrollos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Crear un registro
export const createSlideDesarrollo = async(req, res) => {
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
          const imageUrl = req.file ? `/uploads/blog/slide_desarrollos/${req.file.filename}` : null;
    
          // Crear el registro en la base de datos
          await slideDesarrollosModel.create({ name, image: imageUrl });
          res.status(201).json({ message: "Registro creado correctamente" });
        } catch (error) {
          res.status(500).json({ message: "Error al crear el registro", error: error.message });
        }
      });
};

//Actualizar un registro
export const updateSlideDesarrollo = async(req, res) => {
   try {
    // Buscar el slide por ID
    const slideDesarrollos = await slideDesarrollosModel.findOne({ where: { id: req.params.id } });
    if (!slideDesarrollos) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

   
    if (slideDesarrollos.image) {
      const imagePath = path.join('public', slideDesarrollos.image); 
      if (fs.existsSync(imagePath)) { 
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen:", err);
            
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

   
      const { name } = req.body;
      const imageUrl = req.file ? `/uploads/blog/slide_desarrollos/${req.file.filename}` : slideDesarrollos.image;

      // Actualizar el registro en la base de datos
      await slideDesarrollosModel.update(
        { name, image: imageUrl },
        { where: { id: req.params.id } }
      );

      res.json({ message: "Registro actualizado correctamente" });
    });
  } catch (error) {
    console.error("Error en la actualización del slide:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
}

//Eliminar un registro
export const deleteSlideDesarrollo = async (req, res) => {
  try {
    const slideDesarrollos = await slideDesarrollosModel.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!slideDesarrollos) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

    //Eliminar la imagen del servidor
    if (slideDesarrollos.image) {
      const imagePath = path.join('public', slideDesarrollos.image); // Ruta completa de la imagen
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        } else {
          console.log("Imagen eliminada exitosamente.");
        }
      });
    }

    //Eliminar el registro de la bd
    await slideDesarrollos.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: "Registro y imagen eliminados correctamente" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};