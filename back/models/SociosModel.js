//Importar conexión
import db from '../database/db.js';

//Importar sequelize
import { DataTypes } from 'sequelize';

const sociosModel = db.define('socios', {
    name: {type: DataTypes.STRING},
    subtitle: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING}
})


export default sociosModel;