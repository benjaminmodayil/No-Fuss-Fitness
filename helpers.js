var moment = require('moment')
var hbs = require('hbs')

exports.siteName = `No Fuss Fitness`

exports.getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}

exports.dateRender = function(day) {
  return new hbs.handlebars.SafeString(
    moment()
      .day(`${day}`)
      .format('YYYY-MM-DD')
  )
}
