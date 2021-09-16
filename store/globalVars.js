export const state = () => ({
  logoSrc: require('~/assets/images/dist/logo.svg'),
  graphVal: '1040,5',
  phone: '8 800 500-72-26',
  email: 'info@krialenergo.ru',
  currentCity: 'наб. челны',
  langs: [
    {
      id: 1,
      loc: 'RU',
      selected: true
    },
    {
      id: 2,
      loc: 'ENG',
      selected: false
    }
  ],
  location: 'г. Казань, ул. Журналистов 107 А'
})

export const getters = {
  getLang: state => {
    return state.langs.filter(lang => !lang.selected)[0]
  }
}
