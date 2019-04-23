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
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  address1: {
    type: Sequelize.STRING
  },
  address2: {
    type: Sequelize.STRING
  },
  company: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  Country: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
  telephone: {
    type: Sequelize.STRING
  },
})

module.exports = Order
