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
    type: Sequelize.INTENGER,
    allowNull: false
  },
  purchasePrice: {
    type: Sequelize.FLOAT
  },
})

module.exports = OrdersProducts


