export const state = () => ({
  types: [],
  classes: [],
  applicationAreas: [],
  engines: [],
  filterResults: []
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
  },
  setFilterResults (state, array) {
    state.filterResults = array
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
  },
  getFilterResults (ctx, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        let res = require('~/DATABASE/filterResult.js').default
        ctx.commit('setFilterResults', res)
        resolve()
      }, 500)
    })
  }
}
