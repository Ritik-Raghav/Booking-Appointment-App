const Sequelize = require('sequelize');

const sequelize = new Sequelize('user-data', 'root', 'pass', {
    dialect: 'mysql',
    host: 'localhost',
    logging: console.log
});


module.exports = sequelize;