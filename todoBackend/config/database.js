const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set true untuk melihat query SQL di terminal
});

module.exports = sequelize;
