const router = require('express').Router()
const {Order} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
module.exports = router

router.get('/:userId/orders/count', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (!!req.user.id && userId !== req.user.id) {
      res.status(401).send('not authorized')
    } else {
      const result = await Order.findAll({where: {userId: userId}})
      res.json(result.length)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/page/:offset', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (!!req.user.id && userId !== req.user.id) {
      res.status(401).send('not authorized')
    } else {
      const offset = Number(req.params.offset)
      const orders = await Order.findAll({
        where: {
          userId: userId
        },
        limit: 20,
        offset: offset
      })
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (!!req.user.id && userId !== req.user.id) {
      res.status(401).send('not authorized')
    } else {
      let orderId = req.params.orderId
      const order = await Order.findbyPK(orderId)
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})
