/* eslint-disable no-lonely-if */
/* eslint-disable complexity */
/* eslint-disable max-statements */
const router = require('express').Router()
const User = require('../db/models/user')
const {Order, Product, OrdersProducts} = require('../db/models')
const isAdmin = require('../middleware/isAdmin')
const isLoggedIn = require('../middleware/isLoggedIn')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
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
      req.login(user, async err => {
        if (err) {
          next(err)

          // logged in!
        } else {
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
            newCartProductIDs = foundCartOrder.products.map(
              product => product.id
            )
          } else {
            // if there was stuff in the old cart...
            if (oldCartProducts.length > 0) {
              // if there was no cart order create one
              const newCartOrder = await Order.create({
                userId: userId,
                status: 'cart'
              })
              newCartId = newCartOrder.data.id
            }
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
          // Send the user back to the client
          res.json(user)
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    // Store the session ID
    let sessionID = req.sessionID

    // make the new user
    const user = await User.create(req.body)
    req.login(user, async err => {
      if (err) {
        next(err)
      } else {
        // is there an old cart order
        const oldCartOrder = await Order.findOne({
          where: {
            sessionID: sessionID,
            status: 'cart'
          }
        })
        // if the non-logged-in user had a cart
        // get rid of its session ID and add a userId
        if (oldCartOrder) {
          await Order.update(
            {
              sessionID: null,
              userId: req.user.id
            },
            {
              where: {
                sessionID: sessionID,
                status: 'cart'
              }
            }
          )
        }

        // send back the user
        res.json(user)
      }
    })
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

router.put('/change', isLoggedIn, async (req, res, next) => {
  try {
    await User.findOne({where: {id: req.user.id}}).then(user =>
      user.update({password: req.body.password, resetPassword: false}).then()
    )

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.put('/flag', isAdmin, async (req, res, next) => {
  try {
    await User.update({resetPassword: true}, {where: {id: req.body.userId}})
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
