const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router

router.get('/cart/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      const cartOrder = await Order.findOne({
        where: {
          userId: id,
          status: 'cart'
        },
        include: [{model: Product}]

      })
      res.json(cartOrder.products)
    } catch (err) {
      next(err)
    }
  })