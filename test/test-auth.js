'use strict'
let DATABASE_URL = 'mongodb://localhost/jwt-auth-demo-test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: 'variables.env' })
const { app, runServer, closeServer } = require('../app')
const { User } = require('../users')
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT

const expect = chai.expect

chai.use(chaiHttp)

describe('Auth endpoints', function() {
  const username = 'exampleUser'
  const password = 'examplePass'
  const firstName = 'Example'
  const lastName = 'User'

  before(function() {
    return runServer(DATABASE_URL)
  })

  after(function() {
    return closeServer()
  })

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        firstName,
        lastName
      })
    )
  })

  afterEach(function() {
    return User.remove({})
  })

  describe('/api/auth/login', function() {
    it('Should reject requests with no credentials', function() {
      return chai
        .request(app)
        .post('/api/auth/login')
        .then(res => {
          expect(res).to.redirect
          expect(res.redirects[0]).to.include('/login')
        })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err
          }

          const res = err.response
          expect(res).to.have.status(302)
        })
    })
  })
})
