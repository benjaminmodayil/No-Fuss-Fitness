const chai = require('chai')
const chaiHttp = require('chai-http')

const { app, runServer, closeServer } = require('../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('Routes', () => {
  it('should return HTML on GET', () => {
    return chai
      .request(app)
      .get('/login')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  })

  it('should return HTML on GET', () => {
    return chai
      .request(app)
      .get('/signup')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  })

  it('should return HTML on GET', () => {
    return chai
      .request(app)
      .get('/overview')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  })

  it('should return HTML on GET', () => {
    return chai
      .request(app)
      .get('/meals')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  })

  it('should return HTML on GET', () => {
    return chai
      .request(app)
      .get('/exercises')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  })

  it('should return HTML on GET', () => {
    return chai
      .request(app)
      .get('/initial-details')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  })
})
