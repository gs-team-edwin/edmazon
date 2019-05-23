# Edmazon

[![Build Status](https://travis-ci.org/gs-team-edwin/edmazon.svg?branch=master)](https://travis-ci.org/gs-team-edwin/edmazon)

Edmazon is a fully functioning sample ecommerce site. The site can be found live at http://edmazon.herokuapp.com


# Dependencies

- [React](https://reactjs.org/docs) - Framework
- [Stripe](https://stripe.com/docs) - Payment processing
- [Passport](http://www.passportjs.org/docs/) - Authetication integration with Google accounts


# Setup

Commands to get this repo set up for development:

```
npm install
createdb edmazon
createdb edmazon-test
npm run seed
npm run start-dev
open http://localhost:8080/
```

To log in as an admin (to see the admin functionality for the site), use the email "admin@admin.com". All users' passwords are 123456.


# Team
- [Jon Kurinsky](https://github.com/krnsk0)
- [Barry Ng](https://github.com/hucklebarry)
- [Thomas Pollick](https://github.com/tpol45)
- [Jonathan Helvey](https://github.com/JonathanHelvey)
