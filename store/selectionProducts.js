export const state = () => ({
  title: '',
  imgSrc: '',
  list: [],
  selected: {}
})

export const mutations = {
  setSelectionProducts (state, data) {
    state.title = data.title
    state.imgSrc = data.imgSrc
    state.list = data.list
  },
  setSelectedProduct (state, id) {
    state.selected = state.list.filter(item => item.id === id)[0]
  }
}

export const actions = {
  getSelectionProducts (ctx) {
    let res = require('~/DATABASE/selectionProducts.js').default
    ctx.commit('setSelectionProducts', res)
  }
}
