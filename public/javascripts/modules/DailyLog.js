import { $, $$ } from './bling'
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

export default class DailyLog {
  constructor(el) {
    this.el = el
    this.setupDOM()
    this.bindEvents()
  }

  setupDOM() {
    this.form = this.el.querySelector('form')
  }

  bindEvents() {
    this.form.addEventListener('submit', this.doThis.bind(this))
  }

  doThis(e) {
    e.preventDefault()
    addThis(e, '/progress')
  }
}
