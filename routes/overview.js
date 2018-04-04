var express = require('express')
var router = express.Router()

const overviewController = require('../controllers/overviewController')
const { Exercise, Meal } = require('../models')

//Overview Dashboard

const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login',
  // causing redirects on login
  failureFlash: true
})

///  /overview
router.get('/', jwtAuth, overviewController.index)
router.post('/', jwtAuth, overviewController.post)

module.exports = router
