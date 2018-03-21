const fs = require('fs')

const moment = require('moment')

exports.siteName = `No Fuss Fitness`

exports.getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}

exports.today = () => {
  return moment().format('YYYY-MM-DD')
}

exports.todayItems = arr => {
  return arr.filter(item => {
    return moment.utc(item.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
  })
}

exports.dayName = day => moment(day).format('dddd')

exports.dateRender = function(day) {
  return moment()
    .day(`${day}`)
    .format('YYYY-MM-DD')
}

exports.dump = obj => JSON.stringify(obj, null, 2)
exports.icon = name => `/images/icons/icon-${name}.svg`
exports.siteName = `No Fuss Fitness`
