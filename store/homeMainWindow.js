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
  async getMainWindowInfo (ctx) {
    const res = await this.$axios.get('/main-window')
    ctx.commit('setMainWindowInfo', res.data)
  }
}
