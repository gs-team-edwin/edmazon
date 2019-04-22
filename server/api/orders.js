const router = require('express').Router()
const {Order, Product, Photo, User, OrdersProducts} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const isLoggedIn = require('../middleware/isLoggedIn')

module.exports = router

// returns a single order with associated user
router.get('/:orderId', isLoggedIn, async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    let loggedInUser = req.user.id
    let loggedInUserType = req.user.userType
    // get the order's userId
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId

    if (loggedInUser === orderUserId || loggedInUserType === 'admin') {
      let orderId = req.params.orderId
      const order = await Order.findOne({
        where: {
          id: orderId
        },
        include: [{model: Product, include: {model: Photo}}]
      })
      const user = await User.findOne({
        where: {
          id: order.userId
        }
      })
      res.json({order, user})
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

// update order status, admin only
router.put('/:orderId/status', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    await Order.update({status: req.body.status}, {where: {id: orderId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// deleting products from carts, public
router.delete('/:orderId/remove/:productId', async (req, res, next) => {
  try {
    // WILL BREAK FOR ANON USERS
    // todo
    const userId = req.user.id
    const {productId, orderId} = req.params

    // get the order's userId
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId

    // if the logged-in user has access...
    if (orderUserId === userId) {
      // destroy the item
      await OrdersProducts.destroy({
        where: {
          productId: productId,
          orderId: orderId
        }
      })
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
