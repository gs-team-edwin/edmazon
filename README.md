# Edmazon

[![Build Status](https://travis-ci.org/gs-team-edwin/edmazon.svg?branch=master)](https://travis-ci.org/gs-team-edwin/edmazon)

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

To log in as an admin, open the edmazon DB in Postico or another Postgres tool and grab the email address of the user with id 1. All users' passwords are 123456.
