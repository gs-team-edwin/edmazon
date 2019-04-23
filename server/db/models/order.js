const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER
  },
  sessionID: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM([
      'cart',
      'created',
      'processing',
      'cancelled',
      'completed'
    ])
  },
  tracking: {
    type: Sequelize.STRING
  },
  // milliseconds since Unix epoch
  checkoutDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order
