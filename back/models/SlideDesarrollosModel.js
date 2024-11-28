//Importar conexión
import db from '../database/db.js';

//Importar sequelize
import { DataTypes } from 'sequelize';


const slideDesarrollosModel = db.define('slide_desarrollos', {
    name: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING} 
})

export default slideDesarrollosModel;