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

router.delete('/users/:userId/delete', isAdmin, async (req, res, next) => {
  try {
    const {userId} = req.params
    await User.destroy({
      where: {id: userId}
    })
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})

router.get('/users/offset/:offset', isAdmin, async (req, res, next) => {
  try {
    const offset = Number(req.params.offset)
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userType'],
      limit: 20,
      offset: offset
    })
    const count = await User.count()
    res.json({users, count})
  } catch (err) {
    next(err)
  }
})
