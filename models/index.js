// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onUpdate: 'CASCADE',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsTo(ProductTag, {
  foreignKey: 'product_id',
  constraints: false,
});
// Tags belongToMany Products (through ProductTag)
ProductTag.hasMany(Tag, {
  foreignKey: 'tag_id',
  constraints: false,
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
