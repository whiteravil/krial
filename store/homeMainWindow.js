export const state = () => ({
  background: '',
  title: '',
  menu: []
})

export const mutations = {
  setMainWindowInfo (state, res) {
    state.background = res.background
    state.title = res.title
    state.menu = res.menu
  }
}

export const actions = {
  getMainWindowInfo (ctx) {
    const res = require('~/DATABASE/mainWindow.js').default
    ctx.commit('setMainWindowInfo', res)
  }
}
