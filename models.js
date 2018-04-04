'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
var Schema = mongoose.Schema
var moment = require('moment')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const mealSchema = new Schema({
  _id: { type: mongoose.Schema.ObjectId },
  title: { type: String, required: 'Please enter a meal name!', trim: true },
  calories: { type: Number },
  date: { type: Date, default: Date.now() },
  imageURL: { type: String },
  created: { type: Date, default: Date.now() },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const exerciseSchema = new Schema({
  _id: { type: mongoose.Schema.ObjectId },
  title: { type: String, required: 'Please type in an exercise!', trim: true },
  date: { type: Date, default: moment() },
  type: { type: String, required: true },
  reps: { type: Number },
  sets: { type: Number },
  distance: { type: Number },
  time: { type: Number },
  calories: { type: Number },
  created: { type: Date, default: moment() },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const userInfoSchema = new Schema({
  _id: { type: mongoose.Schema.ObjectId },
  height: { feet: { type: Number }, inches: { type: Number } },
  initialWeight: { type: Number },
  goalDescription: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

userInfoSchema.virtual('fullHeight').get(function() {
  return `${this.height.feet}ft ${this.height.inches}in`
})

userInfoSchema.virtual('BMI').get(function() {
  let inches = this.height.feet * 12 + this.height.inches
  return (this.initialWeight / (inches * inches) * 703).toFixed(1) / 1
})

userInfoSchema.methods.serialize = function() {
  return {
    id: this._id,
    height: {
      feet: this.height.feet,
      inches: this.height.inches
    },
    fullHeight: this.fullHeight,
    initialWeight: this.initialWeight,
    BMI: this.BMI,
    goalDescription: this.goalDescription,
    user: this.user
  }
}

const userProgressSchema = new Schema({
  _id: { type: mongoose.Schema.ObjectId },
  weight: { type: Number },
  date: { type: Date, default: moment() },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

mealSchema.virtual('dayName').get(function() {
  return moment(this.date).format('DDDD')
})

exerciseSchema.virtual('dayName').get(function() {
  return moment(this.date).format('DDDD')
})

mealSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    date: this.date,
    dayName: this.dayName,
    calories: this.calories,
    imageURL: this.imageURL,
    created: this.created
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
    imageURL: this.imageURL,
    created: this.created
  }
}
// user setup
const userSchema = new Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  progress: { type: mongoose.Schema.ObjectId, ref: 'Progress' },
  meals: [{ type: mongoose.Schema.ObjectId, ref: 'Meal' }],
  exercises: [{ type: mongoose.Schema.ObjectId, ref: 'Exercise' }]
})

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  }
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10)
}

// end user setup
const User = mongoose.model('User', userSchema)
const Meal = mongoose.model('Meal', mealSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)
const Progress = mongoose.model('Progress', userProgressSchema)
const Info = mongoose.model('Info', userInfoSchema)

module.exports = { User, Meal, Exercise, Progress, Info }
