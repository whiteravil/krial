export const state = () => ({
  list: []
})

export const mutations = {
  setAnalogs (state, data) {
    state.list = data
  }
}

export const actions = {
  async getAnalogs ({ commit }) {
    const res = await this.$axios.get('/analogs')
    commit('setAnalogs', res.data)
  }
}
