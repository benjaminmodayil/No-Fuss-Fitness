'use strict'
var express = require('express')
var path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var pug = require('pug')
var flash = require('connect-flash')
const passport = require('passport')

var index = require('./routes/index')
var overview = require('./routes/overview')
var meals = require('./routes/meals')
var exercises = require('./routes/exercises')
var progressAPI = require('./routes/progress')
var infoAPI = require('./routes/info')
require('dotenv').config({ path: 'variables.env' })

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT

var moment = require('moment')
const { router: usersRouter } = require('./users')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')

var helpers = require('./helpers')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { User, Meal, Exercise, Progress, Info } = require('./models')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'pug')

app.use(cookieParser('secret'))
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    // cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  if (req.method === 'OPTIONS') {
    return res.send(204)
  }
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

passport.use(localStrategy)
passport.use(jwtStrategy)

app.use('/api/users/', usersRouter)
app.use('/api/auth/', authRouter)

const jwtAuth = passport.authenticate('jwt', { session: false })

// A protected endpoint which needs a valid JWT to access it

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/overview', overview)
app.use('/meals', meals)
app.use('/exercises', exercises)
app.use('/progress/api', progressAPI)
app.use('/api/info', infoAPI)

app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.flashes = req.flash()
  res.locals.currentPath = req.path
  next()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

let server

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`)
          resolve()
        })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer().catch(err => console.error(err))
}

module.exports = { runServer, app, closeServer }
