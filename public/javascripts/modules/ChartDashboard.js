import { $, $$ } from './bling'
import Chart from 'chart.js'

export default class ChartDashboard {
  constructor(el) {
    this.el = el
    this.setupDOM()
  }

  setupDOM() {
    this.navLinks = this.el.querySelectorAll('.home__scroll-navigation__inner__links')
    this.ctx = this.el.querySelector('#myChart')
    this.myChart = new Chart(this.ctx, chartObj)
  }
}

let chartObj = {
  type: 'line',
  data: {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
}
