const router = require('express').Router()
const {Order, Product, Photo, User} = require('../db/models')
module.exports = router

// /api/orders/id
// returns a single order with associated user
router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const order = await Order.findOne({
      where: {
        id: id
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
