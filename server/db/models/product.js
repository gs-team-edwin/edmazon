const Sequelize = require('sequelize')
const db = require('../db')
const Photo = require('./photo')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantityOnHand: {
    type: Sequelize.INTEGER,
  },
  date: {
    type: Sequelize.DATE
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: "default.png"
  }
})

// const makePic = product => {
//   if (product.hasOwnProperty('photo')) {
//     Photo.create({photoUrl: product.photo,
//                   productId: product.id})
//   }
//   else {
//     Photo.create({photoUrl: "default.png",
//                   productId: product.id})
//   } 
// }
// Product.afterCreate(makePic)



module.exports = Product


