const Sequelize = require('sequelize')
const db = require('../db')
const Axios = require('axios')

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
    defaultValue: null,
  },
})
OrdersProducts.prototype.getTotalPrice = async function() {
  let thisPrice = this.purchasePrice
  if (thisPrice === null) {
    let chosenProduct = await Axios.get(`/api/products/${this.productId}`)
    return chosenProduct.getPrice
  }
  else {
    return thisPrice * 0.01
  }
}
module.exports = OrdersProducts


