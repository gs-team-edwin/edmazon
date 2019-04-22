const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
const isLoggedIn = require('../middleware/isLoggedIn')
module.exports = router

// api/getcartid
// returns the ID of the user's cart or if none, false
router.get('/', async (req, res, next) => {
  try {
<<<<<<< HEAD
    console.log('ok im here')
=======
    // THIS WILL ERROR OUT FOR NON-LOGGED-IN USERS
    // todo
>>>>>>> e266cc7254315fa19a9bebf96a017109bc84df02
    let userId = req.user.id
    const cartOrder = await Order.findOne({
      where: {
        userId: userId,
        status: 'cart'
      }
    })
    if (cartOrder) {
      res.json(cartOrder.id)
    } else {
      res.json(false)
    }
  } catch (err) {
    next(err)
  }
})
