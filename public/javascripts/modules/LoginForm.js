// export default class LoginForm {
//   constructor(el) {
//     this.el = el
//     this.setupDOM()
//     this.bindEvents()
//   }

//   setupDOM() {
//     this.form = this.el
//     this.inputs = this.form.querySelectorAll('[name]')
//     this.globalToken = null
//   }

//   bindEvents() {
//     this.form.addEventListener('submit', this.formSubmit.bind(this))
//   }

//   runTest() {
//     console.log('SUCCESS')
//   }

//   formSubmit(e) {
//     e.preventDefault()
//     let parsedData = {}
//     this.inputs.forEach(i => (parsedData[i.name] = i.value))

//     let headers = {
//       body: JSON.stringify(parsedData),
//       credentials: 'same-origin',
//       headers: {
//         'content-type': 'application/json',
//         Authorization: 'Bearer ' + this.globalToken
//       },
//       method: 'POST'
//       // redirect: '/api/auth/login'
//     }

//     fetch('/api/auth/login', headers)
//       .then(data => {
//         console.log(data)
//         if (data.status === 401) {
//           throw 'Login not working.'
//         } else if (data.status === 400) {
//           throw 'Field missing.'
//         } else {
//           return data.json()
//         }
//       })
//       .then(res => {
//         // this.globalToken = res.authToken
//         localStorage.setItem('token', res.authToken)
//         // window.location.replace(res.url)
//       })
//       .catch(err => {
//         console.error(err)
//       })
//   }

//   login(e) {
//     //   e.preventDefault()
//     //   addThis(e, '/progress')
//   }
// }
