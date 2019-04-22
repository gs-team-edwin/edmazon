const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router

// api/cart
// returns the ID of the user's cart or if none, false
router.get('/', async (req, res, next) => {
  try {
    let userId = req.user.id
    const cartOrder = await Order.findOne({
      where: {
        userId: userId,
        status: 'cart'
      }
    })
    if (cartOrder) {
      res.json(cartOrder.id)
    } else {
      res.json(false)
    }
  } catch (err) {
    next(err)
  }
})