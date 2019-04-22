const router = require('express').Router()
const {Order, Product, Photo, User} = require('../db/models')
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
    const session = await stripe.checkout.sessions.create({
      success_url: "aaa",
      cancel_url: "aaa", 
      payment_method_types: ['card'],
      line_items: [req.body]
  })}
  catch (err) {
    next(err)
  }
})


