import { $, $$ } from './modules/bling.js'
import { mealModalTemplate, itemTemplate } from './modules/templating'

// update (needs data in template first)
// let updateDB = identification => {
//   let listItem = $(`[data-id='${identification}']`)
//   console.log(listItem)
//   let editableTitle = listItem.querySelector(`#todo-title--update`)
//   let editableContent = listItem.querySelector(`#todo-content--update`)
//   const title = editableTitle.value || ''
//   const content = editableContent.value || ''
//   const id = editableTitle.closest('li').dataset.id
//   console.log('update input ran')
//   let editableTitles = listItem.querySelectorAll('#todo-title--update')
//   if (editableTitles.length > 1) {
//     console.log('ISSUE')
//   }

//   fetchItem(`/todos/${id}`, { id, title, content }, 'PUT')
// }

let fetchItem = (url, data, meth = 'GET') => {
  let headers = {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: `${meth.toUpperCase()}`
  }
  return fetch(url, headers)
}

let addThis = (e, pathname = window.location.pathname) => {
  e.preventDefault()
  let dbData = {}
  let form = e.currentTarget
  let inputs = form.querySelectorAll('[name]')

  inputs.forEach(i => {
    dbData[i.name] = i.value
  })

  fetchItem(`${pathname}/api`, dbData, 'POST')
    .then(() => {
      clearForm(form)
    })
    .then(() => {
      fetchLatest(pathname, dbData)
    })
    .catch(err => {
      console.log(err)
    })
}

let fetchLatest = (pathname, data) => {
  fetch(`${pathname}/api`).then(response => {
    response.text().then(text => {
      let textJSON = JSON.parse(text)
      let items = textJSON[[Object.keys(textJSON)[0]]]
      let { date } = items[0]
      date = moment.utc(date).format('YYYY-MM-DD')

      if ($(`[data-date="${date}"]`))
        $(`[data-date="${date}"]`).nextElementSibling.append(itemTemplate(items[0]))
    })
  })
}

let clearForm = node => {
  let inputs = node.querySelectorAll('input, select, textarea')
  inputs.forEach(i => (i.value = ''))
}

let modalOpen = e => {
  let bodyEl = $('body')
  let tempDOM = document.createElement('div')
  tempDOM.classList.add('--present')
  tempDOM.classList.add('modal')
  tempDOM.innerHTML = mealModalTemplate
  bodyEl.append(tempDOM)

  let dateValue = e.currentTarget.closest(`[data-date]`).dataset.date
  let dateDayName = e.currentTarget.parentNode.querySelector(`h2`).textContent

  let modalDay = tempDOM.querySelector('.modal-day')
  modalDay.textContent = dateDayName
  let mealDate = tempDOM.querySelector('#date')
  mealDate.value = `${dateValue}`

  let modalCloseBtn = $('.modal-close')
  modalCloseBtn.on('click', modalClose)

  let modalSubmit = $('.modal-submit').closest('.form')
  modalSubmit.on('submit', addThis)
}

let modalClose = e => {
  e.currentTarget.closest('.modal').remove()
}

let getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}

let deleteThis = (e, path) => {
  const item = e.currentTarget.closest('[data-id]')
  const { id } = item.dataset
  fetchItem(`${path + id}`, { id }, 'DELETE').then(() => {
    console.log(`Removing item ${id}`)
    item.remove()
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
  deleteThis
}
