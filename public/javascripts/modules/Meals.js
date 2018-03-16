import { $, $$ } from './bling.js'
import {
  fetchItem,
  addThis,
  fetchLatest,
  clearForm,
  modalOpen,
  modalClose,
  getDay,
  deleteThis
} from '../helper'

export default class Meals {
  constructor(el) {
    this.el = el
    this.setupDOM()
    this.bindEvents()
  }

  setupDOM() {
    this.form = this.el.querySelector('.form')
    this.modalBtns = this.el.querySelectorAll('.modal-launch')

    this.mealDeleteBtns = this.el.querySelectorAll('[data-module="Meals"] .item-delete')
    this.exerciseDeleteBtns = this.el.querySelectorAll(
      '[data-module="Exercises"] .item-delete'
    )
  }

  bindEvents() {
    this.form.on('submit', addThis)
    this.modalBtns.forEach(i => i.on('click', modalOpen))
    this.mealDeleteBtns.map(i => i.on('click', e => deleteThis(e, `/meals/api/`)))
    this.exerciseDeleteBtns.map(i => i.on('click', e => deleteThis(e, `/exercises/api/`)))
  }
}
