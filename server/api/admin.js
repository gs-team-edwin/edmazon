const router = require('express').Router()
const {User, Order} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const {Op} = require('sequelize')
module.exports = router

router.get('/orders/count/filter/:filter', isAdmin, async (req, res, next) => {
  try {
    const filter = req.params.filter
    let orders
    if (filter === 'all') {
      orders = await Order.findAll()
    } else {
      orders = await Order.findAll({
        where: {
          status: filter
        }
      })
    }
    console.log('ORDERS.LENGTH', orders.length)
    res.json(orders.length)
  } catch (err) {
    next(err)
  }
})

router.get(
  '/orders/offset/:offset/filter/:filter',
  isAdmin,
  async (req, res, next) => {
    try {
      const offset = Number(req.params.offset)
      const filter = req.params.filter
      let orders
      if (filter === 'all') {
        orders = await Order.findAll({
          limit: 20,
          offset: offset,
          order: [['checkoutDate', 'DESC']]
        })
      } else {
        orders = await Order.findAll({
          where: {
            status: filter
          },
          limit: 20,
          offset: offset,
          order: [['checkoutDate', 'DESC']]
        })
      }
      res.json(orders)
    } catch (err) {
      next(err)
    }
  }
)
