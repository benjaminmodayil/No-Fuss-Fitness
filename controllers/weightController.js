// const { getSunday, formatToDate, getDay } = require('../helpers.js')
// const { Progress } = require('../models')

// var moment = require('moment')
// moment().format()

// exports.mealsPage = (req, res, next) => {
//   if (req.query.from) {
//     Progress.find({
//       date: {
//         $gte: new Date(`${req.query.from}`),
//         $lt: new Date(`${req.query.to}`)
//       }
//     }).then(items => {
//       res.render('meals', {
//         title: 'Meal Log',
//         weekDays: items,
//         date: `${req.query.from}`
//       })
//     })
//   } else {
//     Progress.find({
//       date: {
//         $gte: new Date(`${getDay('Sunday')}`)
//       }
//     })
//       .then(items => items.map(item => item.serialize()))
//       .then(items => {
//         items.map(item => {
//           weekDays.map(day => {
//             if (item.dayName === day.name) {
//               day.meals.push(item)
//             }
//           })
//         })

//         return weekDays
//       })
//       .then(items => {
//         res.render('meals', {
//           title: 'Progress Log',
//           // weekDays: items,
//           date: getDay('Sunday')
//         })
//         return items
//       })
//   }
// }
