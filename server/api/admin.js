const router = require('express').Router()
const {User, Order} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const {Op} = require('sequelize')
module.exports = router

router.get('/orders/count', isAdmin, async (req, res, next) => {
  try {
    const result = await Order.findAll({
      where: {
        status: {[Op.ne]: 'cart'}
      }
    })
    res.json(result.length)
  } catch (err) {
    next(err)
  }
})

router.get('/orders/offset/:offset', isAdmin, async (req, res, next) => {
  try {
    const offset = Number(req.params.offset)
    const orders = await Order.findAll({
      where: {
        status: {[Op.ne]: 'cart'}
      },
      limit: 20,
      offset: offset,
      order: [['checkoutDate', 'DESC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
