const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router



router.get('/:offset', async (req, res, next) => {
  try {
    let offset = parseInt(req.params.offset)
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gte]: 1+20*offset,
          [Op.lte]: 20+20*offset
        },
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})