//Importar conexión
import db from '../database/db.js';

//Importar sequelize
import { DataTypes } from 'sequelize';


const UserModel = db.define('users', {
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    idRol: {type: DataTypes.INTEGER},
})


export default UserModel;