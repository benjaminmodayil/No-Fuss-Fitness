const { getDay, dateRender, today } = require('../helpers.js')
const { Progress } = require('../models')

var moment = require('moment')

exports.index = async (req, res, next) => {
  let fiveWkAgo = moment
    .utc()
    .subtract(2, 'weeks')
    .startOf('day')

  let now = moment.utc().endOf('day')

  let weight = await Progress.find({
    date: {
      $gte: fiveWkAgo,
      $lt: now
    }
  }).sort({ date: -1 })

  let arr = () => {
    let weights = []
    let temp = []

    for (let wk = 5; wk >= 0; wk--) {
      temp.length = 0
      let start = moment
        .utc()
        .subtract(wk, 'weeks')
        .startOf('week')
        .format('YYYY-MM-DD')
      let end = moment
        .utc()
        .subtract(wk, 'weeks')
        .endOf('week')
        .format('YYYY-MM-DD')

      weight.forEach(i => {
        if (moment.utc(i.date).isBetween(start, end)) {
          temp.push(i)
        }
      })

      weights.push(...temp.slice(0, 1))
    }
    return weights
  }

  // need to return latest weight within 5 weeks or find the last time it was logged.

  let items = arr()

  res.render('overview', {
    title: 'Overview',
    weights: items,
    currentWeight: weight[0]
  })
}
