const router = require('express').Router()
module.exports = router

router.use('/user', require('./user'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/categories', require('./categories'))
router.use('/admin', require('./admin'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
