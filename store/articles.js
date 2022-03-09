export const state = () => ({
  usefulArticles: []
})

export const mutations = {
  setUsefulArticles (state, data) {
    state.usefulArticles = data
  }
}

export const actions = {
  async getUsefulArticles ({ commit }) {
    const res = await this.$axios.get('/useful-articles')
    commit('setUsefulArticles', res.data)
  }
}
