const { getDay, dateRender, today } = require('../helpers.js')
const flash = require('connect-flash')
const mongoose = require('mongoose')

const { Meal } = require('../models')

var moment = require('moment')

// Page integration 👇
exports.mealsPage = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  }
  let dateRange = {
    $gte: new Date(`${getDay('Sunday')}`) || new Date(`${req.query.from}`),
    $lt: new Date(`${moment().endOf(getDay('Saturday'))}`) || new Date(`${req.query.to}`)
  }

  Meal.find({ date: dateRange })
    .then(items => items.map(item => item.serialize()))
    .then(items => {
      res.render('meals', {
        title: 'Meal Log',
        meals: items,
        // need to redo the date passed in below if req.query.from exists
        bgnWeek: getDay('Sunday'),
        today: today(),
        dateRender: dateRender
      })
    })
}

exports.mealsEditPage = (req, res, next) => {
  console.log(req.params)
  res.render('meal-edit', {
    title: 'Edit Meal',
    id: req.params.id
  })
}

// API integration 👇 All below
exports.getMealsAPI = (req, res, next) => {
  Meal.find()
    .sort({ created: -1 })
    .then(items => {
      res.status(200).json({
        meals: items
      })
    })
}

// Get Specific Meal
exports.getMealIDAPI = (req, res, next) => {
  Meal.findById(`${req.params.id}`)
    .then(item => {
      res.status(200).json({
        meals: item
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'something went wrong' })
    })
}

// POST Meal
exports.postMealsAPI = async (req, res) => {
  const reqFields = ['title', 'calories']

  console.log(req.user)

  for (let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i]

    if (!(field in req.body)) {
      const message = `Missing required '${field}' in req.body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  try {
    let item = await Meal.create({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      calories: req.body.calories,
      user: req.user.id,
      date: moment(req.body.date).format('YYYY-MM-DD'),
      imageURL: req.body.imageURL
    })
    res.status(201).json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

// DELETE a Meal
exports.deleteMealsAPI = (req, res, next) => {
  Meal.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Something went wrong. 😢' })
    })
}

// PUT/UPDATE a specific meal
exports.mealEdit = (req, res, next) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match.'
    })
    return
  }

  const updated = {}
  const updateableFields = ['title', 'calories', 'date', 'imageURL']

  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field]
    }
  })

  Meal.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedItem => res.redirect('/meals'))
    .catch(err => res.status(500).json({ message }))
}
