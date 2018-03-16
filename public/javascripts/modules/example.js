export default class Example {
  constructor(el) {
    this.el = el
    console.log(el.textContent, '- From the example module')
  }

  setupDOM() {
    this.navLinks = this.el.querySelectorAll('.home__scroll-navigation__inner__links')
    this.homeSections = this.el.querySelectorAll('.section')
  }

  bindEvents() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.scrollTrigger.bind(this))
    })
  }

  scrollTrigger(e) {
    e.preventDefault()
    let targetedSection = e.currentTarget.getAttribute('href').replace(/"/g, '')
    this.domTarget = document.querySelector(targetedSection)
    this.domTarget.scrollIntoView({ behavior: 'smooth' })
  }
}
