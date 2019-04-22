const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router

// api/cart/userId
// returns the ID of the user's cart or if none, false
router.get('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
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

router.delete('/remove/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
