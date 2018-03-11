let mealForm, mealEditBtn

mealForm = document.querySelector('.meal-form')
mealEditBtn = document.querySelector('.meal-edit')

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

let addThis = e => {
  e.preventDefault()
  let title =
    e.currentTarget
      .closest('.meal-form')
      .querySelector('#meal-title')
      .value.trim() || ''
  let calories = e.currentTarget
    .closest('.meal-form')
    .querySelector('#meal-calories')
    .value.trim()
  let dateValue =
    e.currentTarget
      .closest('.meal-form')
      .querySelector('#meal-date')
      .value.trim() || ''
  let date = new Date(dateValue)

  console.log({
    title,
    calories,
    date
  })

  fetchItem(`/meals/api`, { title, calories, time: date }, 'POST')
    .then(item => {
      clearForm(mealForm)
      return item
    })
    .then(item => {
      console.log(item)
      fetchLatest()
    })
}

let fetchLatest = () => {
  fetch('/meals/api').then(response => {
    response.text().then(text => {
      let { meals } = JSON.parse(text)
      let { _id, title, calories, date } = meals[0]
      // todoTemplate(_id, title, content)
    })
  })
}

let clearForm = node => {
  let inputs = node.querySelectorAll('input, select, textarea')
  inputs.forEach(i => (i.value = ''))
}

// update (needs data in template first)
// let updateDB = identification => {
//   let listItem = document.querySelector(`[data-id='${identification}']`)
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
let mealDayAdd = document.querySelectorAll('.modal-launch')
mealForm.addEventListener('submit', addThis)
mealEditBtn = document.querySelector('.meal-edit')

let modalOpen = e => {
  let bodyEl = document.querySelector('body')
  let tempDOM = document.createElement('div')
  tempDOM.classList.add('--present')
  tempDOM.classList.add('modal')
  tempDOM.innerHTML = modalAddNew
  bodyEl.append(tempDOM)
  let dateValue = e.currentTarget.closest(`[data-date]`).dataset.date
  let dateDayName = e.currentTarget.parentNode.querySelector(`h2`).textContent

  let modalDay = tempDOM.querySelector('.modal-day')
  modalDay.textContent = dateDayName
  let mealDate = tempDOM.querySelector('#meal-date')
  mealDate.value = `${dateValue}`
  // write function needed to return a date abofve
  let modalCloseBtn = document.querySelector('.modal-close')
  modalCloseBtn.addEventListener('click', modalClose)

  let modalSubmit = document.querySelector('.modal-submit').closest('.meal-form')
  modalSubmit.addEventListener('submit', addThis)
}

let modalClose = e => {
  e.currentTarget.closest('.modal').remove()
}

mealDayAdd.forEach(i => i.addEventListener('click', modalOpen))
// imports
// date function
const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

let getDay = (day = 'Sunday') => {
  return moment()
    .day(`${day.charAt(0).toUpperCase() + day.slice(1)}`)
    .format('YYYY-MM-DD')
}
