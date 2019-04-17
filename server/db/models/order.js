const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER
  },
  sessionId: {
    type: Sequelize.INTEGER
    // so that seeding works, disabling until we know what this looks like
    // allowNull: false
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
