const Sequelize = require('sequelize')

const db = require('../db')

const Session = db.define('Sessions', {
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Session
