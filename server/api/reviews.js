const router = require('express').Router()
const {Product, Reviews} = require('../db/models')
const {Category} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

//DO we have to store reviews for users?
//FIX GET REQUEST
router.get('/product/:productId', (req, res, next) => {
  try {
    const reviews = Reviews.findAll({
      where: {
        productId: req.params.productId
      },
      include: [{model: Product}]
    })
    req.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const review = await Reviews.create(req.body)
    req.json(review)
  } catch (err) {
    next(err)
  }
})
