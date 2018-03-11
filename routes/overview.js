var express = require('express')
var router = express.Router()

const overviewController = require('../controllers/overviewController')
const { Exercise, Meal } = require('../models')

//Overview Dashboard
router.get('/', overviewController.index)

module.exports = router
