export const state = () => ({
  title: '',
  advantages: {
    title: '',
    list: []
  }
})

export const mutations = {
  setCatalogCategoryInfo (state, data) {
    state.title = data.title
    state.advantages = data.advantages
  }
}

export const actions = {
  getCatalogCategoryInfo (ctx) {
    let res = require('~/DATABASE/catalogCategory.js').default
    ctx.commit('setCatalogCategoryInfo', res)
  }
}
