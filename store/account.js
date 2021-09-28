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
  getBasketList (ctx) {
    let res = require('~/DATABASE/basket.js').default
    ctx.commit('setBasketList', res)
  },
  getCompareList (ctx) {
    let res = require('~/DATABASE/compare.js').default
    ctx.commit('setCompareList', res)
  },
  deleteBasketItem (ctx, id) {
    return new Promise(resolve => {
      setTimeout(() => {
        let res = require('~/DATABASE/basket.js').default
        ctx.commit('setBasketList', res)
        resolve()
      }, 750)
    })
  },
  deleteCompareItem (ctx, id) {
    return new Promise(resolve => {
      setTimeout(() => {
        let res = require('~/DATABASE/compare.js').default
        ctx.commit('setCompareList', res)
        resolve()
      }, 750)
    })
  }
}
