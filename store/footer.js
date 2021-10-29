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
  async getFooterInfo (ctx) {
    const res = await this.$axios.get('footer.json')
    ctx.commit('setFooterInfo', res.data)
  }
}
