const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router

// api/cart
// returns the ID of the user's cart or if none, false
router.get('/', async (req, res, next) => {
  try {
    let cartOrder

    // if this is a logged in user...
    if (req.user) {
      let userId = req.user.id
      cartOrder = await Order.findOne({
        where: {
          userId: userId,
          status: 'cart'
        }
      })
    }

    // if this is not a logged-in user
    if (!req.user) {
      let sessionID = req.sessionID
      cartOrder = await Order.findOne({
        where: {
          sessionID: sessionID,
          status: 'cart'
        }
      })
    }

    // if we found a card order
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
