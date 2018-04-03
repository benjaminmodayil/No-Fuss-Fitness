import { checkTodaysCalories } from '../helper'

export default class DayCalories {
  constructor(el) {
    this.el = el
    // this.setupDOM()
    // this.bindEvents()
    checkTodaysCalories()
  }

  // setupDOM() {
  //   this.calories = this.el.querySelector('.today__total-calories__count')
  // }

  // bindEvents() {
  //   this.calories.addEventListener('submit', this.doThis.bind(this))
  // }

  // doThis(e) {
  //   e.preventDefault()
  //   addThis(e, '/progress')
  // }
}

// var in_dom = document.body.contains(element);
// var observer = new MutationObserver(function(mutations) {
//     if (document.body.contains(element)) {
//         if (!in_dom) {
//             console.log("element inserted");
//         }
//         in_dom = true;
//     } else if (in_dom) {
//         in_dom = false;
//         console.log("element removed");
//     }

// });
// observer.observe(document.body, {childList: true});
