var express = require('express')
var router = express.Router()

const { Meal } = require('../../models')

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

function getSunday(date) {
  var day = date.getUTCDay() || 7
  if (day !== 0) date.setUTCHours(-24 * (day - 0))
  return date
}

function formatToDate(date) {
  let val, valYear, valMonth, valDay

  valYear = `${date.getUTCFullYear()}`
  valDay = `${date.getUTCDate()}`

  valMonth = `${date.getUTCMonth()}`

  if (valMonth.length === 1) {
    valMonth = `0${valMonth}`
  }
  if (valDay.length === 1) {
    valDay = `0${valDay}`
  }

  return `${valYear}-${valMonth}-${valDay}`
}

router.get('/', function(req, res, next) {
  if (req.query.from) {
    Meal.find({
      time: {
        $gte: new Date(`${req.query.from}`),
        $lt: new Date(`${req.query.to}`)
      }
    }).then(items => {
      res.json({
        meals: items
      })
    })
  } else {
    Meal.find().then(items => {
      res.json({
        meals: items
      })
      return items
    })
  }
})

router.get('/:id', (req, res, next) => {
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
})

router.post('/', (req, res) => {
  const requiredFields = ['title']

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]

    if (!(field in req.body)) {
      const message = `Missing required '${field}' in req.body`
      console.error(message)
      return res.status(400).send(message)
    }

    Meal.create({
      title: req.body.title,
      calories: req.body.calories,
      time: req.body.time,
      imageURL: req.body.imageURL
    })
      .then(meal => {
        console.log(meal)
        res.status(201)
        res.json(meal)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong.' })
      })
  }
})

router.delete('/:id', (req, res, next) => {
  Meal.findByIdAndRemove(req.params.id)
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
  const updateableFields = ['title', 'weight', 'height', 'date']

  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field]
    }
  })

  Meal.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedItem => res.status(204).end())
    .catch(err => res.status(500).json({ message }))
})

module.exports = router
