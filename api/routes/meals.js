var express = require('express')
var router = express.Router()
var moment = require('moment')

const { Meal } = require('../../models')

router.get('/', function(req, res, next) {
  if (req.query.from) {
    Meal.find({
      date: {
        $gte: new Date(`${req.query.from}`),
        $lt: new Date(`${req.query.to}`)
      }
    })
      .sort({ created: -1 })
      .then(items => {
        res.json({
          meals: items
        })
      })
  } else {
    Meal.find()
      .sort({ created: -1 })
      .then(items => {
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

router.post('/', async (req, res) => {
  const reqFields = ['title', 'calories']

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
      title: req.body.title,
      calories: req.body.calories,
      date: moment(req.body.date).format('YYYY-MM-DD'),
      imageURL: req.body.imageURL
    })
    res.status(201).json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong.' })
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
  const updateableFields = ['title', 'calories', 'date', 'imageURL']

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
