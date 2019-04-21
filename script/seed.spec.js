'use strict'
const {expect} = require('chai')
const seed = require('./seed')
const {
  User,
  Review,
  Product,
  Category,
  Order,
  Photo,
  PhotosProducts,
  ProductsCategories,
  OrdersProducts
} = require('../server/db/models')

describe('the seed script', function() {
  this.timeout(10000)
  before(seed)

  it('populates the users table with at least one entry', async () => {
    const users = await User.findAll()
    expect(users).to.have.lengthOf.at.least(1)
  })

  it('populates the categories table with at least one category', async () => {
    const categories = await Category.findAll()
    expect(categories).to.have.lengthOf.at.least(1)
  })

  it('populates the products table with at least one product', async () => {
    const products = await Product.findAll()
    expect(products).to.have.lengthOf.at.least(1)
  })

  it('populates the reviews table with at least one review', async () => {
    const reviews = await Review.findAll()
    expect(reviews).to.have.lengthOf.at.least(1)
  })

  it('populates the orders table with at least one order', async () => {
    const orders = await Order.findAll()
    expect(orders).to.have.lengthOf.at.least(1)
  })

  it('populates the photos table with at least one photo', async () => {
    const photos = await Photo.findAll()
    expect(photos).to.have.lengthOf.at.least(1)
  })

  it('sets the price to null in ordersProducts for all cart orders', async () => {
    const cartOrders = await Order.findAll({where: {status: 'cart'}})
    const nullPriceProducts = await OrdersProducts.findAll({
      where: {purchasePrice: null}
    })
    let idArray = []
    for (let i = 0; i < cartOrders.length; i++) {
      idArray.push(cartOrders[i].dataValues.id)
    }
    let idArray2 = []
    for (let i = 0; i < nullPriceProducts.length; i++) {
      if (!idArray2.includes(nullPriceProducts[i].dataValues.orderId)) {
        idArray2.push(nullPriceProducts[i].dataValues.orderId)
      }
    }
    idArray.sort()
    idArray2.sort()
    expect(idArray).to.deep.equal(idArray2)
  })

  it('gives every product at least one category', async () => {
    const products = await Product.findAll()
    const assignedProducts = await ProductsCategories.findAll()
    let idArray = []
    for (let i = 0; i < products.length; i++) {
      idArray.push(products[i].dataValues.id)
    }
    let idArray2 = []
    for (let i = 0; i < assignedProducts.length; i++) {
      if (!idArray2.includes(assignedProducts[i].dataValues.productId)) {
        idArray2.push(assignedProducts[i].dataValues.productId)
      }
    }
    idArray.sort()
    idArray2.sort()
    expect(idArray).to.deep.equal(idArray2)
  })

  it('gives every category at least one product', async () => {
    const categories = await Category.findAll()
    const assignedCategories = await ProductsCategories.findAll()
    let idArray = []
    for (let i = 0; i < categories.length; i++) {
      idArray.push(categories[i].dataValues.id)
    }
    let idArray2 = []
    for (let i = 0; i < assignedCategories.length; i++) {
      if (!idArray2.includes(assignedCategories[i].dataValues.categoryId)) {
        idArray2.push(assignedCategories[i].dataValues.categoryId)
      }
    }
    idArray.sort()
    idArray2.sort()
    expect(idArray).to.deep.equal(idArray2)
  })

  it('gives every product at least one photo', async () => {
    const products = await Product.findAll()
    const assignedPhoto = await PhotosProducts.findAll()
    let idArray = []
    for (let i = 0; i < products.length; i++) {
      idArray.push(products[i].dataValues.id)
    }
    let idArray2 = []
    for (let i = 0; i < assignedPhoto.length; i++) {
      if (!idArray2.includes(assignedPhoto[i].dataValues.productId)) {
        idArray2.push(assignedPhoto[i].dataValues.productId)
      }
    }
    idArray.sort()
    idArray2.sort()
    expect(idArray).to.deep.equal(idArray2)
  })

  it('gives every photo at least one product', async () => {
    const photos = await Photo.findAll()
    const assignedProducts = await PhotosProducts.findAll()
    let idArray = []
    for (let i = 0; i < photos.length; i++) {
      idArray.push(photos[i].dataValues.id)
    }
    let idArray2 = []
    for (let i = 0; i < assignedProducts.length; i++) {
      if (!idArray2.includes(assignedProducts[i].dataValues.photoId)) {
        idArray2.push(assignedProducts[i].dataValues.photoId)
      }
    }
    idArray.sort()
    idArray2.sort()
    expect(idArray).to.deep.equal(idArray2)
  })
})
