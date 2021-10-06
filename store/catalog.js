export const state = () => ({
  pageTitle: '',
  downloadMaterialsLinkUrl: '',
  catalogAdvantages: {},
  products: []
})

export const mutations = {
  setCatalogInfo (state, data) {
    state.pageTitle = data.pageTitle
    state.downloadMaterialsLinkUrl = data.downloadMaterialsLinkUrl
    state.catalogAdvantages = data.catalogAdvantages
  },
  setCatalogProducts (state, data) {
    state.products = data
  }
}

export const actions = {
  getCatalogInfo (ctx) {
    let res = require('~/DATABASE/catalog.js').default
    ctx.commit('setCatalogInfo', res)
  },
  getCatalogProducts (ctx) {
    return new Promise(resolve => {
      let res = require('~/DATABASE/catalogProducts.js').default
      setTimeout(() => {
        ctx.commit('setCatalogProducts', res)
        resolve()
      }, 1000)
    })
  }
}
