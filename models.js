'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
var moment = require('moment')

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const mealSchema = mongoose.Schema({
  title: { type: String, required: 'Please enter a meal name!', trim: true },
  calories: { type: Number },
  date: { type: Date, default: Date.now() },
  imageURL: { type: String },
  created: { type: Date, default: Date.now }
})

const exerciseSchema = mongoose.Schema({
  title: { type: String, required: 'Please type in an exercise!', trim: true },
  date: { type: Date, default: moment() },
  type: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  distance: { type: Number },
  time: { type: Number },
  calories: { type: Number },
  created: { type: Date, default: moment() }
})

const userInfoSchema = mongoose.Schema({
  height: { feet: { type: Number }, inches: { type: Number } },
  initialWeight: { type: Number },
  goalWeight: { type: Number },
  goalDate: { type: Date },
  goalDescription: { type: String }
})

const userProgressSchema = mongoose.Schema({
  weight: { type: Number },
  // mood: { type: String },
  date: { type: Date, default: moment() }
})

mealSchema.virtual('dayName').get(function() {
  return week[this.date.getUTCDay()]
})

exerciseSchema.virtual('dayName').get(function() {
  return week[this.date.getUTCDay()]
})

mealSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    date: this.date,
    dayName: this.dayName,
    calories: this.calories,
    imageURL: this.imageURL
  }
}

exerciseSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    date: this.date,
    time: this.time,
    dayName: this.dayName,
    calories: this.calories,
    imageURL: this.imageURL
  }
}

const Meal = mongoose.model('Meal', mealSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)
const Progress = mongoose.model('Progress', userProgressSchema)

module.exports = { Meal, Exercise, Progress }
