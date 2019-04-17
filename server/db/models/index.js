const User = require('./User')
const Category = require('./Category')
const OrdersProducts = require('./OrdersProducts')
const Order = require('./Order')
const Photo = require('./Photo')
const Product = require('./Product')
const Review = require('./Review')
const Session = require('./Session')
const ProductsCategories = require('./ProductsCategories')
const PhotosProducts = require('./PhotosProducts')
/**
 * NOTES!
 * Photos is unfinished
 *
 */

Order.belongsTo(Session)
User.hasMany(Session)
Review.belongsTo(User)
User.hasMany(Order)
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
