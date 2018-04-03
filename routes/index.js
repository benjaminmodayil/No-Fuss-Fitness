var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  // quick and dirty fix to logout user fast
  res.cookie('jwt', '')
  res.render('index', { title: 'No Fuss Fitness' })
})

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login | NoFuss' })
})

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Register | NoFuss' })
})

router.get('/initial-details', (req, res, next) => {
  res.render('initial', { title: 'Goals | NoFuss' })
})

router.get('/logout', (req, res, next) => {
  res.cookie('jwt', '')
  res.redirect('/')
})

module.exports = router
