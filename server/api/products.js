const router = require('express').Router()
const {Product, Review} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/page/:offset', async (req, res, next) => {
  try {
    let offset = parseInt(req.params.offset)
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gte]: 1 + 20 * offset,
          [Op.lte]: 20 + 20 * offset
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const products = await Product.findbyPK(id)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    console.log(req.body)
    const review = await Review.create(req.body)
  } catch (err) {
    next(err)
  }
})
