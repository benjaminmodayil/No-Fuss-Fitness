import { $, $$ } from './bling.js'

import {
  fetchItem,
  addThis,
  fetchLatest,
  clearForm,
  modalOpen,
  modalClose,
  getDay,
  deleteThis,
  checkTodaysCalories
} from '../helper'

export default class Pages {
  constructor(el) {
    this.el = el
    this.setupDOM()
    this.bindEvents()
  }

  setupDOM() {
    this.form = this.el.querySelector('.form')
    this.modalBtns = this.el.querySelectorAll('.modal-launch')
    this.deleteBtns = this.el.querySelectorAll('.item-delete')
  }

  bindEvents() {
    this.modalBtns.forEach(i => i.on('click', modalOpen))
    this.deleteBtns.map(i => i.on('click', this.deleteAndUpdateCalories.bind(this)))
  }

  deleteAndUpdateCalories(e) {
    deleteThis(e)
    setTimeout(() => {
      checkTodaysCalories()
    }, 700)
  }
}
