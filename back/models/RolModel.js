//Importar conexión
import db from '../database/db.js';

//Importar sequelize
import { DataTypes } from 'sequelize';


const RolModel = db.define('roles',{
    name: {type: DataTypes.STRING},
})

export default RolModel;