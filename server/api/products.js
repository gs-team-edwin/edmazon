const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// router /products/....

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

router.post('/admin/add', async (req, res, next) => {
  try {
    await Product.create(req.body)
  } catch (error) {
    next(error)
  }
})


