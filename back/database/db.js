import { Sequelize  } from "sequelize";

const db =  new Sequelize('turing','root','12345', {
    host: 'localhost',
    dialect: 'mysql'
});


export default db;