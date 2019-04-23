const router = require('express').Router()
const {User, Order} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const isLoggedIn = require('../middleware/isLoggedIn')
const {Op} = require('sequelize')
module.exports = router

// getting all orders by filter - public
router.get('/orders/offset/:offset/filter/:filter', async (req, res, next) => {
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
})

// deleting a user, admin only
router.delete(
  '/users/:userId/delete',
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const {userId} = req.params
      await User.destroy({
        where: {id: userId}
      })
      res.sendStatus(202)
    } catch (err) {
      next(err)
    }
  }
)

// updating user type - admin only
router.put('/users/:userId', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const {userId} = req.params
    await User.update(
      {userType: req.body.userType},
      {
        where: {id: userId}
      }
    )
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// get all users - admin only
router.get(
  '/users/offset/:offset',
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const offset = Number(req.params.offset)
      const users = await User.findAll({
        attributes: ['id', 'email', 'userType', 'resetPassword'],
        limit: 20,
        offset: offset,
        order: [['id', 'ASC']]
      })
      const count = await User.count()
      res.json({users, count})
    } catch (err) {
      next(err)
    }
  }
)
