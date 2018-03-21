const { getDay, dateRender, today } = require('../helpers.js')
const { Meal } = require('../models')

var moment = require('moment')

exports.mealsPage = (req, res, next) => {
  // let sun, mon, tues, wed, thurs, fri, sat
  // sun = {
  //   name: 'Sunday',
  //   meals: []
  // }
  // mon = {
  //   name: 'Monday',
  //   meals: []
  // }
  // tues = {
  //   name: 'Tuesday',
  //   meals: []
  // }
  // wed = {
  //   name: 'Wednesday',
  //   meals: []
  // }
  // thurs = {
  //   name: 'Thursday',
  //   meals: []
  // }
  // fri = {
  //   name: 'Friday',
  //   meals: []
  // }
  // sat = {
  //   name: 'Saturday',
  //   meals: []
  // }

  // let weekDays = [sun, mon, tues, wed, thurs, fri, sat]

  if (req.query.from) {
    Meal.find({
      date: {
        $gte: new Date(`${req.query.from}`),
        $lt: new Date(`${req.query.to}`)
      }
    }).then(items => {
      res.render('meals', {
        title: 'Meal Log',
        weekDays: items,
        today: today(),
        date: `${req.query.from}`,
        dateRender: dateRender
      })
    })
  } else {
    Meal.find({
      date: {
        $gte: new Date(`${getDay('Sunday')}`)
      }
    })
      .then(items => items.map(item => item.serialize()))
      // .then(items => {
      //   items.map(item => {
      //     weekDays.map(day => {
      //       if (item.dayName === day.name) {
      //         day.meals.push(item)
      //       }
      //     })
      //   })
      //   return weekDays
      // })
      .then(items => {
        res.render('meals', {
          title: 'Meal Log',
          meals: items,
          bgnWeek: getDay('Sunday'),
          today: today(),
          dateRender: dateRender
        })
        return items
      })
  }
}
