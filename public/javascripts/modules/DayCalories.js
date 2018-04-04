import { checkTodaysCalories } from '../helper'

export default class DayCalories {
  constructor(el) {
    this.el = el
    checkTodaysCalories()
  }
}
