export const state = () => ({
  logoSrc: '',
  graphVal: '',
  phone: '',
  email: '',
  currentCity: '',
  langs: [],
  location: ''
})

export const getters = {
  getLang: state => {
    return state.langs.filter(lang => !lang.selected)[0]
  }
}

export const mutations = {
  setGlobalVars (state, data) {
    state.logoSrc = data.logoSrc
    state.graphVal = data.graphVal
    state.phone = data.phone
    state.email = data.email
    state.currentCity = data.currentCity
    state.langs = data.langs
    state.location = data.location
  }
}

export const actions = {
  getGlobalVars (ctx) {
    let res = require('~/DATABASE/globalVars.js').default
    ctx.commit('setGlobalVars', res)
  }
}
