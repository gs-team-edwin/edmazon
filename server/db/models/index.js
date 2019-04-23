const User = require('./user')
const Category = require('./category')
const OrdersProducts = require('./ordersproducts')
const Order = require('./order')
const Photo = require('./photo')
const Product = require('./product')
const Review = require('./review')
const Session = require('./session')
const ProductsCategories = require('./ProductsCategories')
const PhotosProducts = require('./PhotosProducts')
/**
 * TODO
 * Session has been commented out as this is provided; cannot get working defining it manually
 *
 */

// Order.belongsTo(Session)
// User.hasMany(Session)
Review.belongsTo(User, {onDelete: 'cascade'})

Order.belongsTo(User, {onDelete: 'cascade'})
Category.belongsToMany(Product, {
  through: ProductsCategories
})
Product.belongsToMany(Category, {
  through: ProductsCategories
})
Order.belongsToMany(Product, {through: OrdersProducts})
Product.belongsToMany(Order, {through: OrdersProducts})
Product.belongsToMany(Photo, {through: PhotosProducts})
Photo.belongsToMany(Product, {through: PhotosProducts})
Product.hasMany(Review)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  OrdersProducts,
  Order,
  Photo,
  Product,
  Review,
  Session,
  ProductsCategories,
  PhotosProducts
}
