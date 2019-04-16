'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
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

  for (let i = 0; i < 20; i++) {
    let email = faker.internet.email()
    while (emailArr.includes(email)) {
      email = faker.internet.email()
    }
    emailArr.push(email)
    let password = faker.internet.password()

    usersArr.push({email, password, userType: 'user'})
  }
  usersArr[0].usertype = 'admin'
  //  usersArr.push(User.create({username: faker.lorem.word(), email: faker.internet.email()}))

  return usersArr
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(usersInfo())

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
