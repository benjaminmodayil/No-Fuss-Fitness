import moment from 'moment'
import { $, $$ } from './modules/bling.js'
import {
  mealModalTemplate,
  exerciseModalTemplate,
  itemTemplate
} from './modules/templating'

function cookiePlease(name) {
  let match = document.cookie.match(new RegExp(name + '=([^;]+)'))
  if (match) return match[1]
}
const jwt = cookiePlease('jwt')

let fetchItem = (url, data, meth = 'GET') => {
  let headers = {
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + jwt
    },
    body: JSON.stringify(data),
    credentials: 'same-origin',
    method: `${meth.toUpperCase()}`
  }
  console.log(headers.headers)
  return fetch(url, headers)
}

let checkForContainer = () => {
  if ($('.today__placeholder')) {
    let listContainer = document.createElement('ul')
    listContainer.classList.add(
      'flex',
      'flex-col',
      'md-flex-row',
      'w-full',
      '-mx-2',
      'overflow-x-scroll'
    )
    $('.today__placeholder').prepend(listContainer)
    $('.today__placeholder').remove()
  }
}

let addThis = (e, pathname = window.location.pathname) => {
  e.preventDefault()
  let dbData = {}
  let form = e.currentTarget
  let inputs = form.querySelectorAll('[name]')

  inputs.forEach(i => {
    if (i.name === 'date') {
      dbData[i.name] = moment(i.value).format('YYYY-MM-DD')
    } else if (i.name === 'type') {
      if (i.checked) dbData[i.name] = i.value
    } else {
      dbData[i.name] = i.value
    }
  })

  fetchItem(`${pathname}/api`, dbData, 'POST')
    .then(() => {
      clearForm(form)
    })
    .then(() => {
      pathname === '/progress' ? '' : fetchLatest(pathname, dbData)
      checkForContainer()
    })
    .catch(err => {
      console.log(err)
    })
}

let fetchLatest = (pathname, data) => {
  let headers = {
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + jwt
    },
    credentials: 'same-origin'
  }

  fetch(`${pathname}/api`, headers)
    .then(res => {
      return res.text()
    })
    .then(res => {
      console.log(res)
      let textJSON = JSON.parse(res)
      let items = textJSON[[Object.keys(textJSON)[0]]]
      let { date } = items[0]
      date = moment.utc(date).format('YYYY-MM-DD')
      let type = $(`[data-date="${date}"]`).closest('.today-wrapper')
        ? 'featured'
        : 'normal'
      if ($(`[data-date="${date}"]`)) {
        $(`[data-date="${date}"]`).nextElementSibling.prepend(
          itemTemplate(items[0], type)
        )
      }
    })
}

let checkTodaysCalories = () => {
  let module = $('[data-module="DayCalories"]')
  if (!module) {
    return
  } else {
    let amt = module.querySelectorAll('li')
    let count = 0
    let arr = amt.forEach(item => {
      let el = item.querySelector('.data__number')
      count += parseInt(el.textContent)
    })

    if ($('.today__total-calories__count'))
      $('.today__total-calories__count').textContent = `${count}`
  }
}

let clearForm = node => {
  let inputs = node.querySelectorAll('input, select, textarea')
  inputs.forEach(i => (i.value = ''))
}

let switchTypeInForm = dom => {
  if (dom.querySelector('.form--exercise')) {
    let items = [...dom.querySelectorAll('[name="type"]')]
    let [item1, item2] = items

    items.map(i =>
      i.addEventListener('click', () => {
        if (item1.checked) {
          dom.querySelector('.modal--run').classList.add('screenreader-only')
          dom.querySelector('.modal--rep').classList.remove('screenreader-only')
        } else if (item2.checked) {
          dom.querySelector('.modal--run').classList.remove('screenreader-only')
          dom.querySelector('.modal--rep').classList.add('screenreader-only')
        }
      })
    )
  }
}

let modalOpen = e => {
  let bodyEl = $('body')
  let tempDOM = document.createElement('div')
  tempDOM.classList.add('--present')
  tempDOM.classList.add('modal')
  let template =
    $(`[data-name]`).dataset.name === 'exercises'
      ? exerciseModalTemplate
      : mealModalTemplate
  tempDOM.innerHTML = template
  bodyEl.append(tempDOM)

  let dateValue = e.currentTarget.closest(`[data-date]`).dataset.date
  let dateDayName = e.currentTarget.parentNode.querySelector(`.js-day`).textContent

  switchTypeInForm(tempDOM)

  let modalDay = tempDOM.querySelector('.modal-day')
  modalDay.textContent = dateDayName
  let mealDate = tempDOM.querySelector('#date')
  mealDate.value = `${dateValue}`

  let modalCloseBtn = $('.modal-close')
  modalCloseBtn.on('click', modalClose)
  modalSubmit.on('submit', modalClose)
  checkTodaysCalories()
}

let modalClose = () => {
  $('.modal').remove()
}

let getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}

let deleteThis = e => {
  e.preventDefault()
  let headers = {
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + jwt
    },
    credentials: 'same-origin',
    method: 'DELETE'
  }

  const href = e.currentTarget.getAttribute('href')
  const listItem = e.currentTarget.closest('li')

  fetch(href, headers)
    .then(() => {
      listItem.remove()
    })
    .catch(err => {
      console.log('error', err)
    })
}

module.exports = {
  fetchItem,
  addThis,
  fetchLatest,
  clearForm,
  modalOpen,
  modalClose,
  getDay,
  deleteThis,
  checkTodaysCalories,
  jwt
}
