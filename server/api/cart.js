const router = require('express').Router()
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router


router.delete('/remove/:productId', async (req, res, next) => {
  try {
    let removedProduct = await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})