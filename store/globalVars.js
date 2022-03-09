export const state = () => ({
  logoSrc: '',
  logoLightSrc: '',
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
    state.logoLightSrc = data.logoLightSrc
    state.graphVal = data.graphVal
    state.phone = data.phone
    state.email = data.email
    state.currentCity = data.currentCity
    state.langs = data.langs
    state.location = data.location
  }
}

export const actions = {
  async getGlobalVars (ctx) {
    const res = await this.$axios.get('/global-vars')
    ctx.commit('setGlobalVars', res.data)
  }
}
