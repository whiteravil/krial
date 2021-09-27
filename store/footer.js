export const state = () => ({
  blockquote: {},
  info: '',
  pressCenter: [],
  copyright: '',
  links: []
})

export const mutations = {
  setFooterInfo (state, data) {
    state.blockquote = data.blockquote
    state.info = data.info
    state.pressCenter = data.pressCenter
    state.copyright = data.copyright
    state.links = data.links
  }
}

export const actions = {
  getFooterInfo (ctx) {
    let res = require('~/DATABASE/footer.js').default
    ctx.commit('setFooterInfo', res)
  }
}
