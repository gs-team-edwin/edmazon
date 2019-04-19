const router = require('express').Router()
const {Category} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})
