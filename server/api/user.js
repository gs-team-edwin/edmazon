const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

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
    let id = req.params.id
    const products = await Order.findbyPK(id)
    res.json(products)
  } catch (err) {
    next(err)
  }
})
