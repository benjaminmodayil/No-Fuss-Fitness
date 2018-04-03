import { $, $$ } from './bling'
import Chart from 'chart.js'
import moment from 'moment'

export default class ChartDashboard {
  constructor(el) {
    this.el = el
    this.setupDOM()
    this.generateData()
  }

  setupDOM() {
    this.ctx = this.el.querySelector('#myChart')
    this.table = this.el.querySelector('table')
    this.data = this.el.querySelectorAll('.chart-data')
    this.dataPoints = this.generateData()
    this.myChart = new Chart(this.ctx, this.renderChart())
  }

  generateData() {
    if (!(this.data.length < 2)) {
      return this.data.map(i => {
        return {
          weight: i.children[0].textContent,
          date: i.children[1].textContent
        }
      })
    }
  }

  removeTable() {
    this.table && this.table.remove()
  }

  renderChart() {
    this.removeTable()
    return {
      type: 'line',
      data: {
        labels: [...this.generateData().map(i => moment.utc(i.date).format('M-DD'))],
        datasets: [
          {
            label: 'Weight over time',
            data: [...this.generateData().map(i => i.weight)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(215, 189, 34, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(215, 189, 24, 1)'
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
  }
}

let chartObj = {
  type: 'line',
  data: {
    labels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    datasets: [
      {
        label: 'Weight over time',
        data: [12, 19, 3, 5, 2, 3, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(215, 189, 34, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(215, 189, 24, 1)'
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

// db query call to Progress model on /overview route.
// create a small <table> with data, but once ChartDashboard loads
// it removes the table after taking the data
// and replaces it with the chart.
