var express = require('express')
var router = express.Router()

const exerciseController = require('../controllers/exerciseController')
const { Exercise } = require('../models')

//exercises
router.get('/', exerciseController.exercisesPage)

module.exports = router
