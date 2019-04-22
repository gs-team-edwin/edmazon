const router = require('express').Router()
const {Order, OrdersProducts, Product, Photo, User} = require('../db/models')
var stripe = require("stripe")("sk_test_keFS67JeYwCUTOscsQgqorhH00FO37ypvX");
module.exports = router

// /api/orders/id
// returns a single order with associated user
router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const order = await Order.findOne({
      where: {
        id: id
      },
      include: [{model: Product, include: {model: Photo}}]
    })
    const user = await User.findOne({
      where: {
        id: order.userId
      }
    })
    res.json({order, user})
  } catch (err) {
    next(err)
  }
})


router.post('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const token = req.body.id
    const thisOrder = await OrdersProducts.findOne({where: {orderId: id}});
/// todo fix the total cost hook
    await stripe.charges.create({
        amount: 5306,
        currency: 'usd',
        description: 'Example charge',
        source: token,
        statement_descriptor: 'Custom descriptor',})
    res.json(201)
  }
  catch (err) {
    next(err)
  }
})


