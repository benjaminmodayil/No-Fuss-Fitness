var express = require('express')
var router = express.Router()

const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login',
  failureFlash: true
})

const ec = require('../controllers/exerciseController')
const { Exercise } = require('../models')

// PAGES Exercises
router.get('/', jwtAuth, ec.exercisesPage)
//
router.get('/edit/:id', jwtAuth, ec.exercisesEditPage)
router.post('/edit/:id', jwtAuth, ec.exerciseEdit)

router.get('/new', jwtAuth, ec.exerciseNewPage)
router.post('/new', jwtAuth, ec.exerciseNew)

// API Exercises
router.get('/api', jwtAuth, ec.getExercisesAPI)

router.get('/api/:id', jwtAuth, ec.getExerciseIDAPI)

router.post('/api', jwtAuth, ec.postExercisesAPI)

router.delete('/api/:id', jwtAuth, ec.deleteExercisesAPI)

module.exports = router
