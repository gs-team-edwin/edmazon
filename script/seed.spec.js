'use strict'
/* global describe beforeEach it */
const {expect} = require('chai')
const seed = require('./seed')
const {
  User,
  Review,
  Product,
  Category,
  Order,
  ProductsCategories,
  OrdersProducts
} = require('../server/db/models')

describe('the seed script', () => {
  beforeEach(seed) // don't run before every one

  it('populates the users table with at least one entry', async () => {
    const users = await User.findAll()
    expect(users).to.have.lengthOf.at.least(1)
  })

  it('populates the category table with at least one entry', async () => {
    const categories = await Category.findAll()
    expect(categories).to.have.lengthOf.at.least(1)
  })

  // productsOrders test ideas
  // if an order is in cart, all entries for it in the ordersProducts have price null
})
