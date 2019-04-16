const Sequelize = require('sequelize')
const db = require('../db')

const OrdersProducts = db.define('ordersProducts', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
})

module.exports = OrdersProducts


