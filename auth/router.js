'use strict'
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { Info } = require('../models')

const router = express.Router()

const createAuthToken = function(user) {
  let token = jwt.sign({ user }, process.env.JWT_SECRET, {
    subject: user.username,
    expiresIn: process.env.JWT_EXPIRY,
    algorithm: 'HS256'
  })
  return token
}

const localAuth = passport.authenticate('local', {
  session: false,
  failureRedirect: '/login',
  failureFlash: true
})

router.use(bodyParser.json())
router.post('/login', localAuth, async (req, res, next) => {
  const authToken = createAuthToken(req.user.serialize())
  res.cookie('jwt', authToken)
  let infoCount = await Info.findOne({})
    .where('user')
    .equals(req.user.id)
    .count()
  infoCount === 0
    ? res.status(200).redirect('/initial-details')
    : res.status(200).redirect('/overview')

  next()
  // res.json({ authToken, userId: req.user._id })
})

const jwtAuth = passport.authenticate('jwt', { session: false })

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user)
  console.log(authToken)
  res.cookie('jwt', authToken)
  next()
})

module.exports = { router }
