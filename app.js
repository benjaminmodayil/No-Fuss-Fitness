'use strict'

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var hbs = require('hbs')

var index = require('./routes/index')
var users = require('./routes/users')
var meals = require('./routes/meals')
var mealsAPI = require('./api/routes/meals')
var exercises = require('./routes/exercises')
var exercisesAPI = require('./api/routes/meals')

var moment = require('moment')
moment().format()

var helpers = require('./helpers')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { DATABASE_URL, PORT } = require('./config')
const { Meal, Exercise, Progress } = require('./models')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.localsAsTemplateData(app)

hbs.registerHelper('dateRender', function(day) {
  return new hbs.handlebars.SafeString(
    moment()
      .day(`${day}`)
      .format('YYYY-MM-DD')
  )
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((req, res, next) => {
  res.locals.h = helpers
  next()
})
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
// app.use('/users', users)
app.use('/meals', meals)
app.use('/meals/api', mealsAPI)
app.use('/exercises', exercises)
app.use('/exercises/api', exercisesAPI)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

let server

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`)
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
  runServer(DATABASE_URL).catch(err => console.error(err))
}

module.exports = { runServer, app, closeServer }
