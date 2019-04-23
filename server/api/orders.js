const router = require('express').Router()
const {Order, OrdersProducts, Product, Photo, User} = require('../db/models')
var stripe = require('stripe')('sk_test_keFS67JeYwCUTOscsQgqorhH00FO37ypvX')
const isAdmin = require('../middleware/isAdmin')
const isLoggedIn = require('../middleware/isLoggedIn')

module.exports = router

// returns a single order with associated user
// Do not need to rewrite to support anon users because anon users will never need to access it
router.get('/:orderId', isLoggedIn, async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    let loggedInUser = req.user.id
    let loggedInUserType = req.user.userType
    // get the order's userId
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId

    if (loggedInUser === orderUserId || loggedInUserType === 'admin') {
      const order = await Order.findOne({
        where: {
          id: orderId
        },
        include: [{model: Product, include: {model: Photo}}]
      })
      const user = await User.findOne({
        where: {
          id: order.userId
        }
      })
      res.json({order, user})
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

// update order status, admin only
router.put('/:orderId/status', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    await Order.update({status: req.body.status}, {where: {id: orderId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// deleting products from carts, public
router.delete('/:orderId/remove/:productId', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params

    // set our IDs
    let userId
    let sessionID
    if (req.user) {
      userId = req.user.id
    } else {
      sessionID = req.sessionID
    }

    // get the order's userId and sessionID
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId
    const orderSessionID = order.dataValues.sessionID

    // if the user has access...
    if (orderUserId === userId || orderSessionID === sessionID) {
      // destroy the item
      await OrdersProducts.destroy({
        where: {
          productId: productId,
          orderId: orderId
        }
      })
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

// api/orders/:orderId/add/:productId
// adds a product to an existing order
// orderId and productId send through req.params
// quantity, purchaseprice, and userId sent through req.body
// TODO security for this route
router.post('/:orderId/add/:productId', async (req, res, next) => {
  try {
    const {orderId, productId} = req.params
    const {quantity, purchasePrice} = req.body

    // set our IDs
    let userId = null
    let sessionID = null
    if (req.user) {
      userId = req.user.id
    } else {
      sessionID = req.sessionID
    }

    // todo remove purchaseprice here
    let newOrdersProducts = await OrdersProducts.create({
      orderId,
      productId,
      quantity,
      purchasePrice,
      userId,
      sessionID
    })
    res.json(newOrdersProducts)
  } catch (err) {
    next(err)
  }
})

// updating quantities from carts, public
router.put('/:orderId/update/:productId', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params

    // set our IDs
    let userId
    let sessionID
    if (req.user) {
      userId = req.user.id
    } else {
      sessionID = req.sessionID
    }

    // get the order's userId and sessionID
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId
    const orderSessionID = order.dataValues.sessionID

    // if the logged-in user has access...
    if (orderUserId === userId || orderSessionID === sessionID) {
      // update the row
      await OrdersProducts.update(
        {quantity: req.body.quantity},
        {
          where: {
            productId: productId,
            orderId: orderId
          }
        }
      )
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

//api/orders/createOrder
//creates a new order
router.post('/createCartOrder', async (req, res, next) => {
  try {
    let newCartOrder
    if (req.user) {
      newCartOrder = await Order.create({
        userId: req.user.id,
        status: 'cart'
      })
    } else {
      newCartOrder = await Order.create({
        sessionID: req.sessionID,
        status: 'cart'
      })
    }

    res.json(newCartOrder)
  } catch (err) {
    console.log(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const token = req.body.id
    const thisOrder = await OrdersProducts.findOne({where: {orderId: id}})
    /// todo fix the total cost hook
    await stripe.charges.create({
      amount: 5306,
      currency: 'usd',
      description: 'Example charge',
      source: token,
      statement_descriptor: 'Custom descriptor'
    })
    res.json(201)
  } catch (err) {
    next(err)
  }
})
