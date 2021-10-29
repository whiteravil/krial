export const state = () => ({
  basket: [],
  compare: []
})

export const mutations = {
  setBasketList (state, data) {
    state.basket = data
  },
  setCompareList (state, data) {
    state.compare = data
  }
}

export const actions = {
  async getBasketList (ctx) {
    const res = await this.$axios.get('basket.json')
    ctx.commit('setBasketList', res.data)
  },
  async getCompareList (ctx) {
    const res = await this.$axios.get('compare.json')
    ctx.commit('setCompareList', res.data)
  },
  async deleteBasketItem (ctx, id) {
    const res = await this.$axios.get('basket.json')
    ctx.commit('setBasketList', res.data)
  },
  async deleteCompareItem (ctx, id) {
    const res = await this.$axios.get('compare.json')
    ctx.commit('setCompareList', res.data)
  }
}
