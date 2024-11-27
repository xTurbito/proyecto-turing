//Importar conexión
import db from '../database/db.js';

//Importar sequelize
import { DataTypes } from 'sequelize';

const BlogModel = db.define('blogs', {
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING},
    idVendedor: {type: DataTypes.INTEGER}
})


export default BlogModel;