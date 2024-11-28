//Importar conexión
import db from '../database/db.js';

//Importar sequelize
import { DataTypes } from 'sequelize';


const SlidePrincipalModel = db.define('SlidePrincipalModel', {
    name: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING} 
}, {
    tableName: 'slide_principal'
})

export default SlidePrincipalModel;