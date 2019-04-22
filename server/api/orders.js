const router = require('express').Router()
const {Order, Product, Photo, User, OrdersProducts} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')

module.exports = router

// /api/orders/id
// returns a single order with associated user
router.get('/:orderId', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/status', isAdmin, async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    await Order.update({status: req.body.status}, {where: {id: orderId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// api/orders/:orderId/remove/:productId
router.delete('/:orderId/remove/:productId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {productId, orderId} = req.params

    // get the order's userId
    const user = await User.findByPk(userId)

    // if the logged-in user has access...

    if (user.id === userId) {
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
