import Vue from 'vue'
import moment from 'moment'

Vue.filter('declensionNumbers', (number, titles) => {
  let cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
})

Vue.filter('priceFilter', string => {
  let str
  if (string) {
    str = string.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  }
  if (!str) {
    str = 0
  }
  return str
})

Vue.filter('parseDate', date => {
  let dateMoment = moment(date).locale('ru')
  let currDate = moment(new Date())
  let returnDate = dateMoment.format('DD MMMM')
  let fromNow = dateMoment.fromNow()
  if (currDate.year() > dateMoment.year()) {
    returnDate = dateMoment.format('DD MMMM YYYY') + ' года'
  }
  if (fromNow === 'день назад') {
    returnDate = 'вчера'
  }
  if (fromNow.includes('час') || fromNow.includes('часа') || fromNow.includes('часов')) {
    returnDate = 'cегодня'
  }
  return returnDate
})
