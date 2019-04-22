const router = require('express').Router()
const {Order, Product, Photo, User, OrdersProducts} = require('../db/models')
<<<<<<< HEAD
=======
const isAdmin = require('../middleware/isAdmin')
const isLoggedIn = require('../middleware/isLoggedIn')

>>>>>>> e266cc7254315fa19a9bebf96a017109bc84df02
module.exports = router

// returns a single order with associated user
router.get('/:orderId', isLoggedIn, async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    let loggedInUser = req.user.id
    let loggedInUserType = req.user.userType
    // get the order's userId
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId

    if (loggedInUser === orderUserId || loggedInUserType === 'admin') {
      let orderId = req.params.orderId
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
    // WILL BREAK FOR ANON USERS
    // todo
    const userId = req.user.id
    const {productId, orderId} = req.params

    // get the order's userId
    const order = await Order.findByPk(orderId)
    const orderUserId = order.dataValues.userId

    // if the logged-in user has access...
    if (orderUserId === userId) {
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
// quantity and purchaseprice sent through req.body
router.post('/:orderId/add/:productId', async (req, res, next) => {
  try {
    console.log("here I am! post orders!")
    const {orderId, productId} = req.params
    const {quantity, purchasePrice} = req.body
    let newOrdersProducts = await OrdersProducts.create({orderId, productId, quantity, purchasePrice})
    res.json(newOrdersProducts)
  } catch (err) {
    next(err)
  }
})


//api/orders/createOrder
//creates a new order
router.post('/createCartOrder', async (req, res, next) =>{
  try {
    let newCartOrder = await Order.create({userId: req.body.userId, status: 'cart'})
    res.json(newCartOrder)
  } catch (err) {
    console.log(err)
  }
})

