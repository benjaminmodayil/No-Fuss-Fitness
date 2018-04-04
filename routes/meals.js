var express = require('express')
var router = express.Router()

const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login',
  // causing redirects on login
  failureFlash: true
})

const mc = require('../controllers/mealController')
const { Meal } = require('../models')

// PAGES meals
router.get('/', jwtAuth, mc.mealsPage)
//
router.get('/edit/:id', jwtAuth, mc.mealsEditPage)
router.post('/edit/:id', jwtAuth, mc.mealEdit)

router.get('/new', jwtAuth, mc.mealNewPage)
router.post('/new', jwtAuth, mc.mealNew)

// API meals
router.get('/api', jwtAuth, mc.getMealsAPI)

router.get('/api/:id', jwtAuth, mc.getMealIDAPI)

router.post('/api', jwtAuth, mc.postMealsAPI)

router.delete('/api/:id', jwtAuth, mc.deleteMealsAPI)

// router.put('/api/:id', jwtAuth, mc.putMealsAPI)

module.exports = router
