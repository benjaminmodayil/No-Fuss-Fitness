export default class ExerciseForm {
  constructor(el) {
    this.el = el
    this.setupDOM()
    this.bindEvents()
  }

  setupDOM() {
    this.form = this.el
    this.items = [...this.form.querySelectorAll('[name="type"]')]
    this.item1 = this.items[0]
    this.item2 = this.items[1]
  }

  bindEvents() {
    this.items.map(i => i.addEventListener('click', this.switchTypeInForm.bind(this)))
  }

  switchTypeInForm() {
    if (this.item1.checked) {
      this.form.querySelector('.modal--run').classList.add('screenreader-only')
      this.form.querySelector('.modal--rep').classList.remove('screenreader-only')
    } else if (this.item2.checked) {
      this.form.querySelector('.modal--run').classList.remove('screenreader-only')
      this.form.querySelector('.modal--rep').classList.add('screenreader-only')
    }
  }
}
