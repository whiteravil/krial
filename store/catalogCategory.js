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
  async getCatalogCategoryInfo (ctx) {
    const res = await this.$axios.get('catalog/categories.json')
    ctx.commit('setCatalogCategoryInfo', res.data)
  },
  async getCatalogCategories (ctx) {
    const res = await this.$axios.get('product-categories.json')
    ctx.commit('setCatalogCategories', res.data)
  }
}
