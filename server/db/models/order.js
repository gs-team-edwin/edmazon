const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
  },
  sessionId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM
  },
  tracking: {
    type: Sequelize.STRING
  },
  checkoutDate: {
    type: Sequelize.DATE
  }

})

module.exports = Order


