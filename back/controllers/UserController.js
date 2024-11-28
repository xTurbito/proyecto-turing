//Importar el Modelo
import UserModel from "../models/UserModel.js";

//Hasheo Passwords 
import bcrypt from 'bcryptjs';



//Métodos Crud

//Mostrar todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({message: error.message});
    }
}


//Mostrar un registro
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(user)
    } catch (error) {
        res.json({message: error.message});
    }
}


//Crear un registro
export const createUser = async (req, res) => {
    try {
        // Extraer la contraseña de los datos enviados en la solicitud
        const { password } = req.body;

        // Hashear la contraseña con bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Reemplazar la contraseña en el objeto de datos con la contraseña hasheada
        const userData = { ...req.body, password: hashedPassword };

        await UserModel.create(userData);
        res.json({
            "message": "Registro creado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};


//Actualizar un registro 
export const updateUser = async(req, res) => {
    try {
        await UserModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            "message": "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message});
    }
}


//Eliminar un registro
export const deleteUser = async (req, res) => {
    try {
        await UserModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            "message": "Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message});
    }
}