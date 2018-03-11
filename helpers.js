var moment = require('moment')
moment().format()

exports.siteName = `No Fuss Fitness`

exports.getSunday = date => {
  var day = date.getUTCDay() || 7
  if (day !== 0) date.setUTCHours(-24 * (day - 0))
  return date
}

exports.getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}

exports.formatToDate = date => {
  let val, valYear, valMonth, valDay

  valYear = `${date.getUTCFullYear()}`
  valDay = `${date.getUTCDate()}`
  valMonth = `${date.getUTCMonth() + 1}`

  if (valMonth.length === 1) valMonth = `0${valMonth}`
  if (valDay.length === 1) valDay = `0${valDay}`

  return `${valYear}-${valMonth}-${valDay}`
}
