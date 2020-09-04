const { Model, DataTypes } = require('sequelize');

const sequelize = require('../database');

class Item extends Model { }

Item.init({
    name: DataTypes.TEXT,
    expirationdate: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    quantitypackage : DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
}, {
    sequelize,
    tableName: 'item'
});

module.exports = Item;