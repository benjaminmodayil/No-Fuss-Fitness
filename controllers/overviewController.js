const { getDay, dateRender, today } = require('../helpers.js')
const mongoose = require('mongoose')
const { Progress, Info } = require('../models')

var moment = require('moment')

exports.index = async (req, res, next) => {
  let weight = await Progress.find({
    date: {
      $gte: fiveWkAgo,
      $lt: now
    }
  })
    .where('user')
    .equals(req.user.id)
    .sort({ date: -1 })

  let info = await Info.findOne()
    .where('user')
    .equals(req.user.id)
  info = info && info.serialize()

  if (!weight[0] && info) {
    weight[0] = {}
    weight[0].weight = info.initialWeight
  }

  let items = arr(weight)
  let todayIsLogged =
    info &&
    moment.utc(weight[0].date).format('YYYY-MM-DD') === moment.utc().format('YYYY-MM-DD')

  res.render('overview', {
    title: 'Overview',
    weights: items,
    currentWeight: weight[0],
    info,
    todayIsLogged
  })
}

// POSTing weight from /overview
exports.post = async (req, res, next) => {
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
      req.flash('success', 'Updated weight!')
      res.status(201).redirect('/overview')
    })
    .catch(err => {
      console.error(err)
      req.flash('error', "Couldn't update weight... Try again?")
      res.status(500).redirect('/overview')
    })
}

//////////////////////////////////////////////////////// misc helpers

let fiveWkAgo = moment
  .utc()
  .subtract(2, 'weeks')
  .startOf('day')

let now = moment.utc().endOf('day')
//
let arr = weight => {
  let weights = []
  let temp = []

  for (let wk = 5; wk >= 0; wk--) {
    temp.length = 0
    let start = moment
      .utc()
      .subtract(wk, 'weeks')
      .startOf('week')

    let end = moment
      .utc()
      .subtract(wk, 'weeks')
      .endOf('week')

    weight.forEach(i => {
      if (moment.utc(i.date).isBetween(start, end)) {
        temp.push(i)
      }
    })

    weights.push(...temp.slice(0, 1))
  }
  return weights
}
