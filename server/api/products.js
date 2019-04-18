const router = require('express').Router()
const {Product, ProductsCategories} = require('../db/models')
const {Category, Review} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/page/:offset', async (req, res, next) => {
  try {
    let offset = Number(req.params.offset)
    const products = await Product.findAll({
      limit: 20,
      offset: 20 * offset
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/categories/:categoryId/page/:offset', async (req, res, next) => {
  try {
    let id = parseInt(req.params.categoryId, 10)
    let offset = Number(req.params.offset)
    let results = await Category.findAll({
      include: [{model: Product}],
      where: {
        id: id
      },
      limit: 20,
      offset: 20 * offset
    })
    if (results[0]) {
      let desiredProducts = results[0].products
      console.log('results', desiredProducts)
      res.json(desiredProducts)
    } else {
      return []
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const products = await Product.findOne({where: {id}})
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
