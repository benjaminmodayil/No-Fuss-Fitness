var express = require('express')
var router = express.Router()
var moment = require('moment')
const mongoose = require('mongoose')
var today = moment.utc().startOf('day')
var tomorrow = moment.utc(today).endOf('day')

const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/login',
  failureFlash: true
})

const { Progress } = require('../models')

router.get('/', (req, res, next) => {
  Progress.find({})
    .where('user')
    .equals(req.user.id)
    .sort({ date: -1 })
    .then(items => {
      res.json({
        progress: items
      })
      return items
    })
})

router.get('/:id', (req, res, next) => {
  Progress.findById(`${req.params.id}`)
    .then(item => {
      res.status(200).json({
        progress: item
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'something went wrong' })
    })
})

router.post('/', async (req, res) => {
  const requiredFields = ['weight']

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]

    if (!(field in req.body)) {
      const message = `Missing required '${field}' in req.body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  Progress.create({
    _id: new mongoose.Types.ObjectId(),
    weight: req.body.weight,
    date: req.body.date,
    user: req.user.id
  })
    .then(item => {
      console.log(item)
      res.status(201)
      res.json(item)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Something went wrong.' })
    })
})

router.delete('/:id', (req, res, next) => {
  Progress.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Something went wrong. 😢' })
    })
})

router.put('/:id', (req, res, next) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match.'
    })
    return
  }

  const updated = {}
  const updateableFields = ['weight', 'date']

  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field]
    }
  })

  Progress.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedItem => res.status(204).end())
    .catch(err => res.status(500).json({ message }))
})

module.exports = router
