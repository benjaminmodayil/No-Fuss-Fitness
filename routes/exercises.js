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
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect('/logout')
    next()
    return
  } else {
    jwtAuth
    next()
    return
  }
}

router.get('/', jwtAuth, ec.exercisesPage)

router.get('/edit/:id', jwtAuth, ec.exercisesEditPage)
router.post('/edit/:id', jwtAuth, ec.exerciseEdit)
// API Exercises
router.get('/api', jwtAuth, ec.getExercisesAPI)

router.get('/api/:id', jwtAuth, ec.getExerciseIDAPI)

router.post('/api', jwtAuth, ec.postExercisesAPI)

router.delete('/api/:id', jwtAuth, ec.deleteExercisesAPI)

// router.put('/api/:id', jwtAuth, ec.putExercisesAPI)

module.exports = router
