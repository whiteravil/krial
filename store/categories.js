export const state = () => ({
  categories: []
})

export const getters = {
  getCurrentCategory: state => index => {
    return state.categories.filter(item => item.id === index)[0]
  }
}

export const mutations = {
  setCategories (state, array) {
    state.categories = array
  }
}

export const actions = {
  getCategories (ctx) {
    let res = require('~/DATABASE/categories.js').default
    ctx.commit('setCategories', res)
  }
}
