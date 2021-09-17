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
  getTopMenu (ctx) {
    let res = require('~/DATABASE/topMenu.js').default
    ctx.commit('setTopMenu', res)
  },
  getSecondMenu (ctx) {
    let res = require('~/DATABASE/secondMenu.js').default
    ctx.commit('setSecondMenu', res)
  },
  getMainMenu (ctx) {
    let res = require('~/DATABASE/mainMenu.js').default
    ctx.commit('setMainMenu', res)
  },
  getMainMenuRight (ctx) {
    let res = require('~/DATABASE/mainMenuRight.js').default
    res.forEach(item => {
      if (item.childrens) {
        item.opened = false
      }
    })
    ctx.commit('setMainMenuRight', res)
  }
}
