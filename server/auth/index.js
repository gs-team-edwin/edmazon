/* eslint-disable complexity */
/* eslint-disable max-statements */
const router = require('express').Router()
const User = require('../db/models/user')
const {Order, Product, OrdersProducts} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    console.log('in the login route')
    console.log('sessionID', req.sessionID)

    // see if this guest has a cart order
    // and store it
    let sessionID = req.sessionID
    const oldCartOrder = await Order.findOne({
      where: {
        sessionID: sessionID,
        status: 'cart'
      },
      include: [{model: Product}]
    })
    let oldCartProducts = []
    if (oldCartOrder) {
      oldCartProducts = oldCartOrder.products.map(product => ({
        id: product.id,
        quantity: product.ordersProducts.quantity
      }))
    }
    console.log('oldCartProducts', oldCartProducts)

    // ^^ What we do before login ^^
    // vv Boilermaker's login code vv
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))

      // ^^ Boilermaker's login code ^^
      // vv What we do after login vv

      // does user have a cart?
      // and what are its products?
      let newCartId = null
      let newCartProductIDs = []
      const userId = req.user.id
      let foundCartOrder = await Order.findOne({
        where: {
          userId: userId,
          status: 'cart'
        },
        include: [{model: Product}]
      })

      if (foundCartOrder) {
        // if we did find an order
        newCartId = foundCartOrder.id
        newCartProductIDs = foundCartOrder.products.map(product => product.id)
      } else {
        // if there was no cart order create one
        const newCartOrder = await Order.create({
          userId: userId,
          status: 'cart'
        })
        newCartId = newCartOrder.data.id
      }

      // now that we definitely have an orderId for a target cart
      // move products into it
      for (let i = 0; i < oldCartProducts.length; i += 1) {
        const oldProduct = oldCartProducts[i]
        // only add if not already in there...
        if (!newCartProductIDs.includes(oldProduct.id)) {
          await OrdersProducts.create({
            orderId: newCartId,
            productId: oldProduct.id,
            quantity: oldProduct.quantity,
            purchasePrice: null,
            userId: userId,
            sessionID: null
          })
        } else {
          // TODO update quantity to whichever is bigger?
        }
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
