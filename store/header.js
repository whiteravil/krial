export const state = () => ({
  topMenu: [],
  secondMenu: [],
  mainMenu: [],
  mainMenuRight: []
})

export const mutations = {
  setTopMenu (state, array) {
    state.topMenu = array
  },
  setSecondMenu (state, array) {
    state.secondMenu = array
  },
  setMainMenu (state, array) {
    state.mainMenu = array
  },
  setMainMenuRight (state, array) {
    state.mainMenuRight = array
  },
  openMenu (state, data) {
    state.mainMenuRight.forEach(item => {
      if (item.id === data.id) {
        item.opened = data.opened
      }
    })
  }
}

export const actions = {
  async getTopMenu (ctx) {
    const res = await this.$axios.get('/top-menu')
    ctx.commit('setTopMenu', res.data)
  },
  async getSecondMenu (ctx) {
    const res = await this.$axios.get('/second-menu')
    ctx.commit('setSecondMenu', res.data)
  },
  async getMainMenu (ctx) {
    const res = await this.$axios.get('/main-menu')
    ctx.commit('setMainMenu', res.data)
  },
  async getMainMenuRight (ctx) {
    const res = await this.$axios.get('/main-menu-right')
    res.data.forEach(item => {
      if (item.childrens) {
        item.opened = false
      }
    })
    ctx.commit('setMainMenuRight', res.data)
  }
}
