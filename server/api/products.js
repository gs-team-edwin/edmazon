const router = require('express').Router()
const {Product, ProductsCategories} = require('../db/models')
const {Category} = require('../db/models')
const {Op} = require('sequelize')
const isAdmin = require('../middleware/isAdmin')
module.exports = router

// router /products/....

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

router.post('/admin/add', async (req, res, next) => {
  try {
    await Product.create(req.body)
  } catch (error) {
    next(error)
  }
})


