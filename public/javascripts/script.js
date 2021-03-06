import styles from '../stylesheets/style.css'
require('./auth')
import { $, $$ } from './modules/bling'
import { mealModalTemplate, itemTemplate } from './modules/templating'

const moduleElements = document.querySelectorAll('[data-module]')

for (var i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i]
  const name = el.getAttribute('data-module')
  const Module = require(`./modules/${name}`).default
  new Module(el)
}
