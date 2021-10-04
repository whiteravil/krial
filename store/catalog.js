export const state = () => ({
  pageTitle: '',
  downloadMaterialsLinkUrl: '',
  catalogAdvantages: {}
})

export const mutations = {
  setCatalogInfo (state, data) {
    state.pageTitle = data.pageTitle
    state.downloadMaterialsLinkUrl = data.downloadMaterialsLinkUrl
    state.catalogAdvantages = data.catalogAdvantages
  }
}

export const actions = {
  getCatalogInfo (ctx) {
    let res = require('~/DATABASE/catalog.js').default
    ctx.commit('setCatalogInfo', res)
  }
}
