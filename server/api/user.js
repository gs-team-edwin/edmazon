const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

// TODO add security to this route!!
router.get('/:userId/orders/count', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const result = await Order.findAll({where: {userId: userId}})
    res.json(result.length)
  } catch (err) {
    next(err)
  }
})

// TODO add security to this route!!
router.get('/:userId/orders/page/:offset', async (req, res, next) => {
  try {
    const offset = Number(req.params.offset)
    const userId = Number(req.params.userId)

    const orders = await Order.findAll({
      where: {
        userId: userId
      },
      limit: 20,
      offset: offset
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// TODO add security to this route !!
router.get('/orders/:orderId', async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    const order = await Order.findbyPK(orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
