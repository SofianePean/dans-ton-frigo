const { Model, DataTypes } = require('sequelize');

const sequelize = require('../database');

class Category extends Model { }

Category.init({
    name: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'category'
});

module.exports = Category;