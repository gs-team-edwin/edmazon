const router = require('express').Router()
const {Product, Photo, Review} = require('../db/models')
const {Category} = require('../db/models')
const {Op} = require('sequelize')
const isAdmin = require('../middleware/isAdmin')
module.exports = router

const PRODUCT_PAGE_SIZE = 12

router.get('/offset/:offset', async (req, res, next) => {
  try {
    let offset = Number(req.params.offset)
    const products = await Product.findAll({
      include: [{model: Photo}, {model: Category}],
      limit: PRODUCT_PAGE_SIZE,
      offset: offset
    })
    const count = await Product.count()
    res.json({products, count})
  } catch (err) {
    next(err)
  }
})

router.get('/search/:term/offset/:offset', async (req, res, next) => {
  try {
    let offset = Number(req.params.offset)
    let query = req.params.term
    const products = await Product.findAll({
      include: [{model: Photo}],
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        }
      },
      limit: PRODUCT_PAGE_SIZE,
      offset: offset
    })
    const count = await Product.count({
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        }
      }
    })
    const found = count > 0
    res.json({products, count, found})
  } catch (err) {
    next(err)
  }
})

router.get('/categories/:categoryId/offset/:offset', async (req, res, next) => {
  try {
    let id = Number(req.params.categoryId)
    let offset = Number(req.params.offset)
    let category = await Category.findOne({
      include: [{model: Product, include: [{model: Photo}, {model: Category}]}],
      where: {
        id: id
      }
    })
    // if no category matches or if no products in category
    if (!category || category.products === []) {
      res.json({
        count: 0,
        products: [],
        found: false
      })
    } else {
      let count = category.products.length
      res.json({
        count: count,
        products: category.products.slice(offset, offset + PRODUCT_PAGE_SIZE),
        found: true
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id

    const product = await Product.findOne({
      where: {id},
      include: [{model: Photo}, {model: Review}]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//THIS NEEDS TO BE IN THE ABLOVE ROUTE

router.post('/:id/reviews', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
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
