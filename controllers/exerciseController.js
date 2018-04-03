const { getDay, dateRender, today } = require('../helpers.js')
const { Exercise } = require('../models')
const mongoose = require('mongoose')

var moment = require('moment')

exports.exercisesPage = (req, res, next) => {
  let dateRange = {
    $gte: new Date(`${getDay('Sunday')}`) || new Date(`${req.query.from}`),
    $lt: new Date(`${moment().endOf(getDay('Saturday'))}`) || new Date(`${req.query.to}`)
  }

  Exercise.find({
    date: dateRange
  }).then(items => {
    console.log(items)
    res.render('exercises', {
      title: 'Exercise Log',
      exercises: items,
      bgnWeek: getDay('Sunday'),
      today: today(),
      dateRender: dateRender
    })
  })
}

exports.exercisesEditPage = (req, res, next) => {
  console.log(req.params)
  res.render('exercise-edit', {
    title: 'Edit Exercise',
    id: req.params.id
  })
}

// API Exercises
exports.getExercisesAPI = (req, res, next) => {
  let dateRange = {
    $gte: new Date(`${getDay('Sunday')}`) || new Date(`${req.query.from}`),
    $lt: new Date(`${getDay('Saturday')}`) || new Date(`${req.query.to}`)
  }

  Exercise.find()
    .sort({ created: -1 })
    .then(items => {
      res.json({
        exercises: items
      })
      return items
    })
}

exports.getExerciseIDAPI = (req, res, next) => {
  Exercise.findById(`${req.params.id}`)
    .then(item => {
      res.status(200).json({
        exercises: item
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'something went wrong' })
    })
}

exports.postExercisesAPI = (req, res, next) => {
  const requiredFields = ['title', 'type']

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]

    if (!(field in req.body)) {
      const message = `Missing required '${field}' in req.body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  Exercise.create({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    date: req.body.date,
    type: req.body.type,
    reps: req.body.reps,
    sets: req.body.sets,
    distance: req.body.distance,
    time: req.body.time,
    calories: req.body.calories,
    user: req.user.id
  })
    .then(exercise => {
      console.log(exercise)
      res.status(201)
      res.json(exercise)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Something went wrong.' })
    })
}

exports.deleteExercisesAPI = (req, res, next) => {
  Exercise.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Something went wrong. 😢' })
    })
}

exports.exerciseEdit = (req, res, next) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match.'
    })
    return
  }

  const updated = {}
  const updateableFields = [
    'title',
    'date',
    'type',
    'reps',
    'sets',
    'distance',
    'time',
    'calories'
  ]

  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field]
    }
  })

  Exercise.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedItem => res.status(204).end())
    .catch(err => res.status(500).json({ message }))
}
