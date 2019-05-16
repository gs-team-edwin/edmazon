/* eslint-disable no-shadow */
'use strict'
const db = require('../server/db')
const {
  User,
  Review,
  Product,
  Photo,
  Category,
  Order,
  ProductsCategories,
  OrdersProducts,
  PhotosProducts
} = require('../server/db/models')
const faker = require('faker')

/***********************************
 *      GLOBAL CONSTANTS
 ***********************************/

const N = 100
const PHOTO_COUNT = 3
const CATEGORY_COUNT = 5

/***********************************
 *      UTILITY FUNCTIONS
 ***********************************/

// includes 0 to max - 1
function getRandomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
// capitalizes first letter in word
function titleCaseWord(word) {
  if (/^[a-z]/.test(word[0])) {
    return word[0].toUpperCase() + word.slice(1)
  } else return word
}
// title cases a phrase
function titleCase(phrase) {
  return phrase
    .split(' ')
    .map(titleCaseWord)
    .join(' ')
}
// shuffle array using fisher-yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
// get random date
function randomDate(start = new Date(2016, 0, 1), end = new Date()) {
  let randDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
  return randDate.getTime()
}

/*************************************
 * FACTORY FUNCTIONS FOR BASE MODELS
 *************************************/

// build users array
function userInfoFactory(N) {
  const usersArr = []
  const emailArr = []
  for (let i = 0; i < N; i++) {
    // loop until we get a unique email
    let email = faker.internet.email()
    while (emailArr.includes(email)) {
      email = faker.internet.email()
    }
    emailArr.push(email)
    const password = '123456'
    const resetPassword = getRandomInteger(10) === 0
    usersArr.push({email, password, userType: 'user', resetPassword})
  }
  // set the first user to admin
  usersArr[0].email = 'admin@admin.com'
  usersArr[0].userType = 'admin'
  usersArr[0].resetPassword = false

  // set the second user to admin
  usersArr[1].email = 'user@user.com'
  usersArr[1].userType = 'user'
  usersArr[1].resetPassword = false
  return usersArr
}

// build categories array
function categoryFactory(CATEGORY_COUNT) {
  const categoriesArr = []
  const categoryWords = shuffle([
    'Extraordinary',
    'Impressive',
    'Exceptional',
    'Delightful',
    'Magnificent',
    'Majestic',
    'Splendid',
    'Glorious',
    'Marvelous',
    'Superlative',
    'Unrivaled',
    'Peerless',
    'Faultless',
    'Flawless'
  ])
  for (let i = 0; i < CATEGORY_COUNT; i++) {
    const name = categoryWords.pop()
    categoriesArr.push({name})
  }
  return categoriesArr
}

// build products array
function productInfoFactory(N) {
  const productsArr = []
  for (let i = 0; i < N; i++) {
    let titleNouns = [
      'Javascript',
      'Java',
      'C',
      'C++',
      'C#',
      'Python',
      'SQL',
      'PHP',
      'QBASIC',
      'Erlang',
      'Elm',
      'Coffeescript',
      'Typescript',
      'ASP',
      'COBOL',
      'Elixir',
      'FORTRAN',
      'Haskell',
      'Lisp',
      'HTML',
      'CSS',
      'Lua',
      'OCaml',
      'Ruby',
      'Visual Basic',
      'Go',
      '.NET',
      'RegEx',
      'Swift',
      'Shell',
      'Assembly',
      'Befunge',
      'BASIC',
      'Pascal'
    ]

    let titleAdjectives = [
      'Object-Oriented',
      'Statically-Typed',
      'Dynamically-Typed',
      'Functional',
      'Procedural',
      'Declarative',
      'Concurrent',
      'Concurrent',
      'Esoteric',
      'Pure',
      'Interpreted',
      'Performant',
      'Interactive',
      'Garbage-Collected',
      'List-Based',
      'Reflective',
      'Imperative',
      'Embeddable',
      'Synchronous',
      'Asynchronous',
      'First-Order',
      'Second-Order',
      'Lazy',
      'Deterministic',
      'Monotonic',
      'Reactive',
      'Multi-Agent',
      'Dataflow',
      'Message-Based',
      'Sequential',
      'Stateful',
      'Stateless',
      'Shared-State',
      'High-Level',
      'Domain-Specific',
      'Neural',
      'Backpropagating',
      'Unit-Tested'
    ]
    let title =
      titleAdjectives[getRandomInteger(titleAdjectives.length)] +
      ' ' +
      titleAdjectives[getRandomInteger(titleAdjectives.length)] +
      ' ' +
      titleNouns[getRandomInteger(titleNouns.length)]
    title = titleCase(title)
    const desc = faker.hacker.phrase()
    const description = desc
      .split(' ')
      .map((w, i) => (i === 0 ? titleCase(w) : w))
      .join(' ')
    const price = getRandomInteger(1000000)
    // one tenth of products are out of stock
    const isEmpty = getRandomInteger(9)
    let quantityOnHand
    if (isEmpty === 0) {
      quantityOnHand = 0
    } else {
      quantityOnHand = getRandomInteger(100)
    }
    productsArr.push({
      title,
      description,
      price,
      quantityOnHand
    })
  }
  return productsArr
}

// build reviews array
function reviewInfoFactory(N) {
  const reviewsArr = []
  for (let i = 0; i < N * 2; i++) {
    const reviewTitle = titleCase(
      faker.hacker.adjective() + ' ' + faker.hacker.noun()
    )
    const reviewBody =
      faker.hacker.phrase() +
      ' ' +
      faker.hacker.phrase() +
      ' ' +
      faker.hacker.phrase() +
      ' ' +
      faker.hacker.phrase() +
      ' ' +
      faker.hacker.phrase() +
      ' ' +
      faker.hacker.phrase() +
      ' ' +
      faker.hacker.phrase()
    const stars = getRandomInteger(5) + 1
    const productId = getRandomInteger(N) + 1
    const userId = getRandomInteger(N) + 1
    reviewsArr.push({
      title: reviewTitle,
      body: reviewBody,
      stars,
      productId,
      userId
    })
  }
  return reviewsArr
}

// build orders array
function orderFactory(N) {
  let orders = []
  function buildAndAddOrder(userId) {
    const sessionId = null
    const statusChoices = [
      'cart',
      'created',
      'processing',
      'cancelled',
      'completed'
    ]
    let status = statusChoices[getRandomInteger(5)]

    // check to see if the user in question already has a cart order
    const thisUsersCartOrders = orders.filter(
      order => order.userId === userId && order.status === 'cart'
    )
    if (thisUsersCartOrders.length) {
      status = 'completed'
    }
    // if status is cart, checkout date is null
    let checkoutDate
    let tracking
    if (status === 'cart') {
      checkoutDate = null
      tracking = null
    } else {
      checkoutDate = randomDate()
      tracking = faker.random.uuid()
    }

    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const address1 = faker.address.streetAddress()
    const address2 = faker.address.secondaryAddress()
    const company = faker.company.companyName()
    const city = faker.address.city()
    const state = faker.address.state()
    const zip = faker.address.zipCode()
    const country = faker.address.country()
    const telephone = faker.phone.phoneNumber()

    orders.push({
      userId,
      sessionId,
      status,
      tracking,
      checkoutDate,
      firstName,
      lastName,
      address1,
      address2,
      company,
      city,
      country,
      state,
      zip,
      telephone
    })
  }

  // add 100 orders with random users
  for (let i = 0; i < N; i++) {
    const userId = getRandomInteger(N) + 1
    buildAndAddOrder(userId)
  }

  // add 50 orders to the first user
  for (let i = 0; i < 100; i += 1) {
    buildAndAddOrder(1)
  }

  return orders
}

// build photos array
function photoFactory(PHOTO_COUNT) {
  const photos = []
  for (let i = 0; i < PHOTO_COUNT; i++) {
    const photoUrl = `/images/${i + 1}.jpg`
    photos.push({photoUrl})
  }
  return photos
}

/********************************************
 * FACTORY FUNCTIONS FOR MANY-TO-MANY TABLES
 ********************************************/

// assign all products to a category
// and give some products multiple categories
function productCategoryFactory(N, CATEGORY_COUNT) {
  const productCategoryArr = []
  for (let i = 0; i < N; i++) {
    // make sure every product is in a category
    const productId = i + 1
    let categoryId = (i % CATEGORY_COUNT) + 1
    productCategoryArr.push({productId, categoryId})

    // randomly add 1 more category to some products
    const numberToAdd = getRandomInteger(4) + 1
    for (let x = 0; x < numberToAdd; x++) {
      categoryId = ((categoryId + 1) % CATEGORY_COUNT) + 1
      productCategoryArr.push({productId, categoryId})
    }
  }
  return productCategoryArr
}

// map products to orders
// every order gets between one and five products
async function ordersProductsFactory(N) {
  const ordersProductsArr = []

  // get length of order array
  const ordersList = await Order.findAll()
  const numOfOrders = ordersList.length

  // loop through N
  for (let i = 0; i < numOfOrders; i++) {
    const numberOfProducts = getRandomInteger(4) + 1

    // set the first product id
    let productId = getRandomInteger(N) + 1

    // each loop adds a product
    for (let x = 0; x < numberOfProducts; x++) {
      // set up the easy stuff
      const orderId = i + 1
      productId = ((productId + 1) % N) + 1 // make sure we don't duplicate products
      const quantity = getRandomInteger(5) + 1

      // get the purchased status for this order
      // if it's cart, set price to null
      // else, 50% chance price has changed
      const orderObject = await Order.findByPk(orderId)
      const orderStatus = orderObject.dataValues.status
      let purchasePrice
      if (orderStatus === 'cart') {
        purchasePrice = null
      } else {
        let priceChangeChance = getRandomInteger(11)
        if (priceChangeChance < 5) {
          const productObject = await Product.findByPk(productId)
          purchasePrice = productObject.dataValues.price
        } else {
          // use a small value to make the price changes very obvious
          purchasePrice = getRandomInteger(100)
        }
      }
      ordersProductsArr.push({orderId, productId, quantity, purchasePrice})
    }
  }
  return ordersProductsArr
}

// give every product at least one photo
function photosProductsFactory(N, PHOTO_COUNT) {
  const photosProductsArr = []
  let photoId = 1
  for (let i = 0; i < N; i += 1) {
    let numExtraPhotosToAdd = getRandomInteger(3) + 1
    for (let x = 0; x < numExtraPhotosToAdd; x += 1) {
      const productId = i + 1
      photoId = ((photoId + 1) % PHOTO_COUNT) + 1
      photosProductsArr.push({photoId, productId})
    }
  }
  return photosProductsArr
}

/*************************************
 *         SEEDING FUNCTIONS
 *************************************/

// call everything and do the seeding
async function seed() {
  // clear the db
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(userInfoFactory(N))
  console.log(`seeded ${users.length} users`)

  const categories = await Category.bulkCreate(categoryFactory(CATEGORY_COUNT))
  console.log(`seeded ${categories.length} categories`)

  const products = await Product.bulkCreate(productInfoFactory(N))
  console.log(`seeded ${products.length} produdcts`)

  const productCategory = await ProductsCategories.bulkCreate(
    productCategoryFactory(N, CATEGORY_COUNT)
  )
  console.log(`seeded ${productCategory.length} productCategory rows`)

  const reviews = await Review.bulkCreate(reviewInfoFactory(N))
  console.log(`seeded ${reviews.length} reviews`)

  const orders = await Order.bulkCreate(orderFactory(N))
  console.log(`seeded ${orders.length} orders`)

  const photos = await Photo.bulkCreate(photoFactory(PHOTO_COUNT))
  console.log(`seeded ${photos.length} photos`)

  const ordersProducts = await OrdersProducts.bulkCreate(
    await ordersProductsFactory(N)
  )
  console.log(`seeded ${ordersProducts.length} ordersProducts rows`)

  const photosProducts = await PhotosProducts.bulkCreate(
    await photosProductsFactory(N, PHOTO_COUNT)
  )
  console.log(`seeded ${photosProducts.length} photosProducts rows`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
