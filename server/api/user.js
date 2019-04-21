const router = require('express').Router()
const {Order, User} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const {Op} = require('sequelize')
module.exports = router

router.get('/:userId/orders/offset/:offset', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (
      req.user.id &&
      (userId === req.user.id || req.user.userType === 'admin')
    ) {
      const offset = Number(req.params.offset)
      const orders = await Order.findAll({
        where: {
          userId: userId,
          status: {[Op.ne]: 'cart'}
        },
        limit: 20,
        offset: offset,
        order: [['checkoutDate', 'DESC']]
      })
      const count = await Order.count({
        where: {
          userId: userId,
          status: {[Op.ne]: 'cart'}
        }
      })
      const {email} = await User.findOne({where: {id: userId}})
      res.json({count, orders, email})
    } else {
      res.status(401).send('not authorized')
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
