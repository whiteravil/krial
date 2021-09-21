import Vue from 'vue'

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
