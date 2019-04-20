const router = require('express').Router()
const {User, Order} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const {Op} = require('sequelize')
module.exports = router

router.get(
  '/orders/offset/:offset/filter/:filter',
  isAdmin,
  async (req, res, next) => {
    try {
      const offset = Number(req.params.offset)
      const filter = req.params.filter
      let orders
      let count
      if (filter === 'all') {
        orders = await Order.findAll({
          limit: 20,
          offset: offset,
          order: [['checkoutDate', 'DESC']],
          where: {
            status: {
              [Op.ne]: 'cart'
            }
          }
        })
        count = await Order.count({
          order: [['checkoutDate', 'DESC']],
          where: {
            status: {
              [Op.ne]: 'cart'
            }
          }
        })
      } else {
        orders = await Order.findAll({
          where: {
            status: {[Op.and]: {[Op.ne]: 'cart', [Op.eq]: filter}}
          },
          limit: 20,
          offset: offset,
          order: [['checkoutDate', 'DESC']]
        })
        count = await Order.count({
          where: {
            status: {[Op.and]: {[Op.ne]: 'cart', [Op.eq]: filter}}
          },
          order: [['checkoutDate', 'DESC']]
        })
      }
      res.json({orders, count})
    } catch (err) {
      next(err)
    }
  }
)
