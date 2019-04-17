const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const products = await Product.findbyPK(id)
    res.json(products)
  } catch (err) {
    next(err)
  }
})
