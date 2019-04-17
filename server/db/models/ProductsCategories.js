const Sequelize = require('sequelize')
const db = require('../db')

const ProductsCategories = db.define('productsCategories', {})

module.exports = ProductsCategories
