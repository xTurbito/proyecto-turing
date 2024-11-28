import sociosModel from "../models/SociosModel.js"
import multer from "multer"
import path from 'path';
import fs from 'fs';


// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = 'public/uploads/blog/socios';

      if (!fs.existsSync(uploadDir)){
          fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

//Métodos para CRUD

//Mostrar todos los registros
export const getAllSocios = async (req, res) => {
    try {
        const socios = await sociosModel.findAll();

        res.json(socios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Mostrar un registro
export const getSocio = async(req, res) => {
    try {
        const socio = await sociosModel.findOne({
          where: {
            id: req.params.id
          }
        });
    
        
        if (!socio) {
          return res.status(404).json({ message: "Socio no encontrado" });
        }
    
         // Asignar URL de la imagen si existe
         if (sociosModel.image) {
            sociosModel.imageUrl = `http://localhost:8000${sociosModel.image}`;
          console.log('URL de la imagen:', sociosModel.imageUrl); 
          
          sociosModel.imageUrl = null; 
        }
    
        res.json(socio);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


//Crear un registro
export const createSocio = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Error al subir la imagen", error: err.message });
        }

        const { name, subtitle, descripcion } = req.body;

        if (!name) {
            return res.status(400).json({ message: "El campo 'name' es obligatorio" });
        }

        if (!subtitle) {
            return res.status(400).json({ message: "El campo 'subtitle' es obligatorio" });
        }

        if (!descripcion) {
            return res.status(400).json({ message: "El campo 'descripcion' es obligatorio" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "La imagen es obligatoria" });
        }

        try {
            const imageUrl = `/uploads/blog/socios/${req.file.filename}`;

            // Crear el registro en la base de datos
            const newSocio = await sociosModel.create({ name, subtitle, descripcion, image: imageUrl });
            res.status(201).json({ message: "Registro creado correctamente", data: newSocio });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el registro", error: error.message });
        }
    });
};


//Actualizar un registro
export const updateSocio = async (req, res) => {
  try {
    // Buscar el socio por ID
    const socio = await sociosModel.findOne({ where: { id: req.params.id } });
    if (!socio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al subir la imagen", error: err.message });
      }


      let imageUrl = socio.image; // Mantener la imagen actual por defecto
      if (req.file) {
        // Eliminar la imagen anterior del servidor (si existe)
        if (socio.image) {
          const imagePath = path.join('public', socio.image); 
          if (fs.existsSync(imagePath)) {
            try {
              fs.unlinkSync(imagePath); 
              console.log("Imagen anterior eliminada exitosamente.");
            } catch (unlinkError) {
              console.error("Error al eliminar la imagen:", unlinkError);
            }
          }
        }


        imageUrl = `/uploads/blog/socios/${req.file.filename}`;
      }

   
      const { name, subtitle, descripcion } = req.body;

      // Actualizar el registro en la base de datos
      await sociosModel.update(
        { name, subtitle, descripcion, image: imageUrl },
        { where: { id: req.params.id } }
      );

      res.json({ message: "Registro actualizado correctamente" });
    });
  } catch (error) {
    console.error("Error en la actualización del socio:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

//Eliminar un registro
export const deleteSocio = async(req, res) => {
  try {
    const socio = await sociosModel.findOne({
      where: {
        id: req.params.id
      }
    });

    
     if (!socio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    //Eliminar la imagen del servidor
    if (socio.image) {
      const imagePath = path.join('public', socio.image); // Ruta completa de la imagen
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        } else {
          console.log("Imagen eliminada exitosamente.");
        }
      });
    }

    //Eliminar el registro de la bd
    await sociosModel.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: "Registro y imagen eliminados correctamente" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};