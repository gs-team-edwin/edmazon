const Sequelize = require('sequelize')

const db = require('../db')

const Session = db.define('Sessions', {})

module.exports = Session
