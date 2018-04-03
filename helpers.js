const fs = require('fs')

const moment = require('moment')

exports.siteName = `No Fuss Fitness`

exports.getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}

exports.dayMonth = date => {
  return moment(date).format('MMM Do')
}

exports.today = () => {
  return moment().format('YYYY-MM-DD')
}

exports.formatDate = date => {
  return moment.utc(date).format('YYYY-MM-DD')
}

exports.todayItems = arr => {
  return arr.filter(item => {
    return moment.utc(item.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
  })
}

exports.otherWeekItems = arr => {
  return arr.filter(item => {
    return moment.utc(item.date).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')
  })
}

exports.weekArray = moment.weekdays()

exports.dayName = day => moment(day).format('dddd')

exports.dateRender = function(day) {
  return moment()
    .day(`${day}`)
    .format('YYYY-MM-DD')
}

exports.dump = obj => JSON.stringify(obj, null, 2)
exports.icon = name => fs.readFileSync(`./public/images/icons/icon-${name}.svg`)
exports.svgIMG = name => `/images/${name}.svg`
exports.siteName = `No Fuss Fitness`
