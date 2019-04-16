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

Session.hasOne(Order)
User.hasMany(Session)
User.hasMany(Review)
User.hasMany(Order)
Order.hasMany(OrdersProducts)
OrdersProducts.hasOne(Product)
Category.hasMany(Product)
Product.hasMany(Category)
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
