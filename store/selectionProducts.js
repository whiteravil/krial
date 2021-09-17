export const state = () => ({
  title: '',
  imgSrc: '',
  list: []
})

export const mutations = {
  setSelectionProducts (state, data) {
    state.title = data.title
    state.imgSrc = data.imgSrc
    state.list = data.list
  }
}

export const actions = {
  getSelectionProducts (ctx) {
    let res = require('~/DATABASE/selectionProducts.js').default
    ctx.commit('setSelectionProducts', res)
  }
}
