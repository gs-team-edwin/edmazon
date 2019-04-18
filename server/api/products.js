const router = require('express').Router()
const {Product, Photo, Reviews} = require('../db/models')
const {Category} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/page/:offset', async (req, res, next) => {
  try {
    let offset = Number(req.params.offset)
    const products = await Product.findAll({
      include: [{model: Photo}],
      limit: 20,
      offset: 20*offset
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/search/:term/page/:offset', async (req, res, next) => {
  try {
    let offset = Number(req.params.offset)
    let query = req.params.term
    const products = await Product.findAll({
      include: [{model: Photo}],
      where: {
        'title': { like: '%' + query + '%' } 
      },
      limit: 20,
      offset: 20*offset
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
      include: [{model: Product, include:[{model: Photo}]}],
      where: {
        id: id
      },
      limit: 20,
      offset: 20*offset
    })
    if (results[0]){
      let desiredProducts = results[0].products
      res.json(desiredProducts)
    }
    else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const product = await Product.findOne({where: {id}, include: [{model: Photo}, {model: Reviews}]})
    res.json(product)
  } catch (err) {
    next(err)
  }
})
