const Item = require('./item');
const Category = require('./category');

Item.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id',
});

Category.hasMany(Item, {
    as: 'items',
    foreignKey: 'category_id',
});

module.exports = { Item, Category };