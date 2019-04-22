const router = require('express').Router()
const {Order, Product, Photo, User, OrdersProducts} = require('../db/models')
module.exports = router

// /api/orders/id
// returns a single order with associated user
router.get('/:orderId', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
})

// api/orders/:orderId/remove/:productId
router.delete('/:orderId/remove/:productId', async (req, res, next) => {
  try {
    // get the logged in user's id
    const userId = Number(req.params.userId)

    // get the order's userId
    const user = await User.findOne({
      where: {
        id: order.userId
      }
    })

    // if the logged-in user has access...

    if ((user.id = userId)) {
      // destroy the item
      await Product.destroy({
        where: {
          id: req.params.productId
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

