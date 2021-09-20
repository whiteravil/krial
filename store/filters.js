export const state = () => ({
  selected: {
    type: 1,
    power: [200, 300],
    price: [300000, 600000],
    class: 1,
    applicationArea: 1
  },
  types: [],
  classes: [],
  applicationAreas: [],
  engines: []
})

export const mutations = {
  setFilterAllTypes (state, array) {
    state.types = array
  },
  setFilterAllClasses (state, array) {
    state.classes = array
  },
  setFilterAllApplicationAreas (state, array) {
    state.applicationAreas = array
  },
  setFilterAllEngines (state, array) {
    state.engines = array
  }
}

export const actions = {
  getFilterAllTypes (ctx) {
    let res = require('~/DATABASE/filters/types.js').default
    ctx.commit('setFilterAllTypes', res)
  },
  getFilterAllClasses (ctx) {
    let res = require('~/DATABASE/filters/classes.js').default
    ctx.commit('setFilterAllClasses', res)
  },
  getFilterAllApplicationAreas (ctx) {
    let res = require('~/DATABASE/filters/applicationAreas.js').default
    ctx.commit('setFilterAllApplicationAreas', res)
  },
  getFilterAllEngines (ctx) {
    let res = require('~/DATABASE/filters/engines.js').default
    ctx.commit('setFilterAllEngines', res)
  }
}
