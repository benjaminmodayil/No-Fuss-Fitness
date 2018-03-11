'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

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
  time: { type: Date, default: Date.now() },
  imageURL: { type: String }
})

const exerciseSchema = mongoose.Schema({
  title: { type: String, required: 'Please type in an exercise!', trim: true },
  date: { type: Date, default: Date.now() },
  type: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  distance: { type: Number },
  time: { type: Number },
  calories: { type: Number }
})

const userProgressSchema = mongoose.Schema({
  name: { type: String, required: 'Please type in your name!', trim: true },
  height: { feet: { type: Number }, inches: { type: Number } },
  weight: { type: Number },
  date: { type: Date, default: Date.now() }
})

mealSchema.virtual('dayName').get(function() {
  return week[this.time.getUTCDay()]
})

exerciseSchema.virtual('dayName').get(function() {
  return week[this.date.getUTCDay()]
})

mealSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    time: this.time,
    dayName: this.dayName,
    calories: this.calories,
    imageURL: this.imageURL
  }
}

exerciseSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
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
