var express = require('express')
var router = express.Router()
var moment = require('moment')
const mongoose = require('mongoose')
var flash = require('connect-flash')

const today = moment.utc().startOf('day')
const tomorrow = moment.utc(today).endOf('day')

const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login',
  failureFlash: true
})

const { Info } = require('../models')

router.get('/', jwtAuth, (req, res, next) => {
  Info.find({})
    .where('user')
    .equals(req.user.id)
    .then(items => items.map(i => i.serialize()))
    .then(items => {
      res.json({
        items
      })
    })
})

router.post('/', jwtAuth, async (req, res) => {
  Info.findOne({})
    .where('user')
    .equals(req.user.id)
    .count()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'AlreadyExists',
          message: 'Initial Info Already Exists',
          location: 'Initial Info'
        })
      }
    })
    .catch(err => res.status(500).json({ code: 500, message: err }))

  const requiredFields = ['feet', 'inches', 'initialWeight', 'goalDescription']

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]

    if (!(field in req.body)) {
      const message = `Missing required '${field}' in req.body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  Info.create({
    _id: new mongoose.Types.ObjectId(),
    height: {
      feet: req.body.feet,
      inches: req.body.inches
    },
    initialWeight: req.body.initialWeight,
    goalDescription: req.body.goalDescription,
    user: req.user.id
  })
    .then(item => {
      req.flash('success', 'Info saved!')
      res.status(201).redirect('/overview')
    })
    .catch(err => {
      req.flash('error', 'Something went wrong 😢. Try again.')
      res.status(201).redirect('/login')
    })
})

module.exports = router
