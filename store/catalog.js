export const state = () => ({
  title: '',
  downloadMaterialsLinkUrl: '',
  advantages: {},
  products: []
})

export const mutations = {
  setCatalogInfo (state, data) {
    state.title = data.title
    state.downloadMaterialsLinkUrl = data.downloadMaterialsLinkUrl
    state.advantages = data.advantages
  },
  setCatalogProducts (state, data) {
    state.products = data
  }
}

export const actions = {
  async getCatalogInfo (ctx) {
    const res = await this.$axios.get('catalog/main.json')
    ctx.commit('setCatalogInfo', res.data)
  },
  async getCatalogProducts (ctx) {
    const res = await this.$axios.get('catalog/products.json')
    ctx.commit('setCatalogProducts', res.data)
  }
}
