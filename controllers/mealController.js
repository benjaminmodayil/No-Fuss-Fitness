const { getSunday, formatToDate, getDay } = require('../helpers.js')
const { Meal } = require('../models')

exports.mealsPage = (req, res, next) => {
  let sun, mon, tues, wed, thurs, fri, sat
  sun = {
    name: 'Sunday',
    meals: []
  }
  mon = {
    name: 'Monday',
    meals: []
  }
  tues = {
    name: 'Tuesday',
    meals: []
  }
  wed = {
    name: 'Wednesday',
    meals: []
  }
  thurs = {
    name: 'Thursday',
    meals: []
  }
  fri = {
    name: 'Friday',
    meals: []
  }
  sat = {
    name: 'Saturday',
    meals: []
  }

  let weekDays = [sun, mon, tues, wed, thurs, fri, sat]

  let wkStart = getSunday(new Date())
  let formattedDate = formatToDate(wkStart)

  if (req.query.from) {
    Meal.find({
      time: {
        $gte: new Date(`${req.query.from}`),
        $lt: new Date(`${req.query.to}`)
      }
    }).then(items => {
      res.render('meals', {
        title: 'Meal Log',
        weekDays: items,
        date: `${req.query.from}`
      })
    })
  } else {
    Meal.find({
      time: {
        $gte: new Date(`${getDay('Sunday')}`)
      }
    })
      .then(items => items.map(item => item.serialize()))
      .then(items => {
        items.map(item => {
          weekDays.map(day => {
            if (item.dayName === day.name) {
              day.meals.push(item)
            }
          })
        })

        return weekDays
      })
      .then(items => {
        res.render('meals', {
          title: 'Meal Log',
          weekDays: items,
          date: getDay('Sunday')
        })
        return items
      })
  }
}
