const router = require('express').Router()
const {Order, Product, Photo, User} = require('../db/models')
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

// api/orders/:orderId/remove/:productId
router.delete('/:orderId/remove/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
