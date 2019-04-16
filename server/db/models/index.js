const User = require('./user')
const Category = require('./category')
const OrdersProducts = require('./ordersproducts')
const Order = require('./order')
// const Photo = require('./photo')
const Product = require('./product')
const Review = require('./review')
const Session = require('./session')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsTo(Session)
User.hasMany(Session)
Review.belongsTo(User)
User.hasMany(Order)
Category.hasMany(Product)
Product.belongsToMany(Category, {through: 'productCategory',
  as: 'Category',
  foreignKey: 'productId'}
)
Order.belongsToMany(Product, {through: OrdersProducts})
Product.belongsToMany(Order, {through: OrdersProducts})
// Product.hasMany(Photo)
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
  // Photo,
  Product,
  Review,
  Session
}
