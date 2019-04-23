const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router

// api/cart
// returns the ID of the user's cart or if none, false
router.get('/', async (req, res, next) => {
  try {
    // THIS WILL ERROR OUT FOR NON-LOGGED-IN USERS
    // todo
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

// get length of cart
router.get('/length', async (req, res, next) => {
  try {
    // THIS WILL ERROR OUT FOR NON-LOGGED-IN USERS
    // todo
    let userId = req.user.id
    const cartOrder = await Order.findOne({
      where: {
        userId: userId,
        status: 'cart'
      }
    })
    if (cartOrder) {
      const length = await OrdersProducts.count({
        where: {orderId: cartOrder.id}
      })
      res.json(length)
    } else {
      res.json(false)
    }
  } catch (err) {
    next(err)
  }
})
