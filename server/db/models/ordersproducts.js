const Sequelize = require('sequelize')
const db = require('../db')
const {Product} = require('../db') 

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
    defaultValue: null
  }
})
OrdersProducts.prototype.getTotalPrice = async function() {
  let thisPrice = this.purchasePrice
  if (thisPrice === null) {
    let chosenProduct = Product.findById(this.productId)
    return chosenProduct.price
  }
  else {
    return thisPrice
  }
}
module.exports = OrdersProducts
