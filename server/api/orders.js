const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/cart/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      const order = await Order.findAll({
        where: {
            userId: id,
            status: 'cart'
        },
        include: [{model: Product}]
      })
      res.json(order[0].products)
    } catch (err) {
      next(err)
    }
  })