const { getSunday, formatToDate, getDay } = require('../helpers.js')

exports.index = (req, res, next) => {
  res.render('overview', {
    title: 'Overview'
  })
}
