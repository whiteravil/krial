export const state = () => ({
  title: '',
  advantages: {
    title: '',
    list: []
  },
  catalogCategories: []
})

export const mutations = {
  setCatalogCategoryInfo (state, data) {
    state.title = data.title
    state.advantages = data.advantages
  },
  setCatalogCategories (state, array) {
    state.catalogCategories = array
  }
}

export const actions = {
  getCatalogCategoryInfo (ctx) {
    let res = require('~/DATABASE/catalogCategory.js').default
    ctx.commit('setCatalogCategoryInfo', res)
  },
  getCatalogCategories (ctx) {
    let res = require('~/DATABASE/productCategories.js').default
    ctx.commit('setCatalogCategories', res)
  }
}
