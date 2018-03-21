import { $, $$ } from './bling.js'

export default class Nav {
  constructor(el) {
    this.el = el
    this.setupDOM()
    this.bindEvents()
  }

  setupDOM() {
    this.navTrigger = this.el.querySelector('#hide-menu')
    this.targetElements = $$('.global-nav span')
  }

  bindEvents() {
    this.navTrigger.addEventListener('click', this.handleMenu.bind(this))
  }

  handleMenu(e) {
    this.targetElements.forEach(item => item.classList.toggle('js-menu-toggle'))
  }
}
