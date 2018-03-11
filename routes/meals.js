var express = require('express')
var router = express.Router()

const mealController = require('../controllers/mealController')
const { Meal } = require('../models')

//meals
router.get('/', mealController.mealsPage)

module.exports = router
