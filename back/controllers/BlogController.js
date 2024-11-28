import BlogModel from "../models/BlogModel.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads/';
    // Crear la carpeta si no existe
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

// Métodos CRUD

// Mostrar todos los registros
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mostrar un registro
export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog no encontrado" });
    }

    
    if (blog.image) {
      blog.imageUrl = `http://localhost:8000${blog.image}`;  // URL completa
      console.log('URL de la imagen:', blog.imageUrl);
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Crear un registro
export const createBlog = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al subir la imagen", error: err.message });
    }

    try {
      const { title, content, price, idVendedor } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Crear el registro en la base de datos
      await BlogModel.create({ title, content, price, image: imageUrl, idVendedor });
      res.status(201).json({ message: "Registro creado correctamente" });

    } catch (error) {
      res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
  });
};

// Actualizar un registro
export const updateBlog = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al subir la imagen", error: err.message });
    }

    try {
      const blog = await BlogModel.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog no encontrado" });
      }

      const { title, content, price, idVendedor } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : blog.image;

      // Actualizar el blog en la base de datos
      await BlogModel.update(
        { title, content, price, idVendedor, image: imageUrl },
        { where: { id: req.params.id } }
      );

      res.json({ message: "Registro actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Eliminar un registro
export const deleteBlog = async (req, res) => {
  try {
    // Buscar el blog antes de eliminarlo para obtener la ruta de la imagen
    const blog = await BlogModel.findOne({
      where: {
        id: req.params.id
      }
    });

    // Si no se encuentra el blog, retornar un error
    if (!blog) {
      return res.status(404).json({ message: "Blog no encontrado" });
    }

    // Eliminar la imagen del servidor si existe
    if (blog.image) {
      const imagePath = path.join('public', blog.image); // Ruta completa de la imagen
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        } else {
          console.log("Imagen eliminada exitosamente.");
        }
      });
    }

    // Eliminar el registro del blog en la base de datos
    await BlogModel.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: "Registro y imagen eliminados correctamente" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
