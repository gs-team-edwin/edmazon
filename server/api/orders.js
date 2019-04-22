const router = require('express').Router()
const {Order, Product, OrdersProducts, Photo} = require('../db/models')
module.exports = router

router.get('/cart/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const cartOrder = await Order.findOne({
      where: {
        userId: id,
        status: 'cart'
      },
      include: [{model: Product, include: {model: Photo}}]
    })
    if (cartOrder) {
      res.json(cartOrder.products)
    } else {
      console.log('Cart is empty')
    }
  } catch (err) {
    next(err)
  }
})
