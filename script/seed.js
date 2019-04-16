'use strict'

const db = require('../server/db')
const {User, Review, Product} = require('../server/db/models')
const faker = require('faker')

function usersInfo() {
  let usersArr = []
  let emailArr = []
  //{email: asdfasdf, password, googleId, usertype, etc.}
  //loop n times
  //generate email
  //make email
  //check if email is already in usersArr
  //if so, go back to step 1
  //generate password
  //generate usertype

  for (let i = 0; i < 600; i++) {
    let email = faker.internet.email()
    while (emailArr.includes(email)) {
      email = faker.internet.email()
    }
    emailArr.push(email)
    let password = faker.internet.password()

    usersArr.push({email, password, userType: 'user'})
  }
  usersArr[0].userType = 'admin'
  //  usersArr.push(User.create({username: faker.lorem.word(), email: faker.internet.email()}))

  return usersArr
}





function getRandomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



function reviewsInfo () {
  let reviewsArr = []
  for (let i = 0; i < 100; i++) {
    let reviewTitle = faker.hacker.adjective() + ' ' + faker.hacker.noun()
    let reviewBody = faker.hacker.phrase()
    let stars = getRandomInteger(5) + 1
    let productId = getRandomInteger(100) + 1
    let userId = getRandomInteger(100) + 1
    reviewsArr.push({title: reviewTitle, body: reviewBody, stars, productId, userId})
  }
  return reviewsArr
}

function productsInfo () {
  let productsArr = []
  for (let i = 0; i < 100; i++) {
    let title = faker.hacker.adjective() + ' ' + faker.hacker.noun()
    let description = faker.hacker.phrase()
    let price = getRandomInteger(10)
    productsArr.push({title, description, price})
  }
  return productsArr
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(usersInfo())
  await Product.bulkCreate(productsInfo())
  await Review.bulkCreate(reviewsInfo())


  console.log(`seeded ${users.length} users`)
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