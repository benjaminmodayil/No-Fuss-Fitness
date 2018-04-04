const { getDay, dateRender, today } = require('../helpers.js')
const { Exercise } = require('../models')
const mongoose = require('mongoose')
const flash = require('connect-flash')

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

exports.exercisesEditPage = async (req, res, next) => {
  const exercise = await Exercise.findOne({ _id: req.params.id })

  res.render('exercise-edit', {
    title: 'Edit Exercise',
    exercise
  })
}

exports.exerciseNewPage = async (req, res, next) => {
  res.render('exercise-new', {
    title: 'New Exercise'
  })
}

exports.exerciseNew = async (req, res, next) => {
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
      req.flash('success', '🏋️‍ Exercise added.')
      res.status(201).redirect('/exercises')
    })
    .catch(err => {
      console.error(err)
      req.flash('error', '😢 There has been an error. Try again.')
      res.status(500).redirect('/exercises/new')
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
    'id',
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

  let message = 'Oops'
  Exercise.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedItem => res.redirect('/exercises'))
    .catch(err => res.status(500).json({ err }))
}
