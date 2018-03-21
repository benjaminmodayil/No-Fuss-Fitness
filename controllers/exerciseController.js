const { getDay, dateRender, today } = require('../helpers.js')
const { Exercise } = require('../models')

var moment = require('moment')

exports.exercisesPage = (req, res, next) => {
  let sun, mon, tues, wed, thurs, fri, sat
  sun = {
    name: 'Sunday',
    exercises: []
  }
  mon = {
    name: 'Monday',
    exercises: []
  }
  tues = {
    name: 'Tuesday',
    exercises: []
  }
  wed = {
    name: 'Wednesday',
    exercises: []
  }
  thurs = {
    name: 'Thursday',
    exercises: []
  }
  fri = {
    name: 'Friday',
    exercises: []
  }
  sat = {
    name: 'Saturday',
    exercises: []
  }

  let weekDays = [sun, mon, tues, wed, thurs, fri, sat]

  if (req.query.from) {
    Exercise.find({
      date: {
        $gte: new Date(`${req.query.from}`),
        $lt: new Date(`${req.query.to}`)
      }
    }).then(items => {
      res.render('exercises', {
        title: 'Exercise Log',
        weekDays: items,
        date: `${req.query.from}`
      })
    })
  } else {
    Exercise.find({
      date: {
        $gte: new Date(`${getDay('Sunday')}`)
      }
    })
      .then(items => items.map(item => item.serialize()))
      .then(items => {
        items.map(item => {
          weekDays.map(day => {
            if (item.dayName === day.name) {
              day.exercises.push(item)
            }
          })
        })

        return weekDays
      })
      .then(items => {
        res.render('exercises', {
          title: 'Exercise Log',
          weekDays: items,
          date: getDay('Sunday'),
          today: today(),
          dateRender: dateRender
        })
        return items
      })
  }
}
