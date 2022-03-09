export const state = () => ({
  popularCategories: [],
  history: [],
  morphSearchResults: [],
  searchResultsEquipments: [],
  searchResultsPressCenters: [],
  searchResultsServices: []
})

export const mutations = {
  setSearchResultEquipments (state, array) {
    state.searchResultsEquipments = array
  },
  setPopularCategories (state, array) {
    state.popularCategories = array
  },
  setHistory (state, array) {
    state.history = array
  },
  setMorphSearchResults (state, array) {
    state.morphSearchResults = array
  },
  setSearchResultsPressCenters (state, array) {
    state.searchResultsPressCenters = array
  }
}

export const actions = {
  getSearchResults (ctx, data) {
    let resultPromises = []
    resultPromises.push(new Promise(resolve => {
      this.$axios.get('/search-results-equipments').then(res => {
        ctx.commit('setSearchResultEquipments', res.data)
        resolve()
      })
    }))
    resultPromises.push(new Promise(resolve => {
      this.$axios.get('/search-results-press-centers').then(res => {
        ctx.commit('setSearchResultsPressCenters', res.data)
        resolve()
      })
    }))
    return Promise.all(resultPromises)
  },
  async getPopularCategories (ctx) {
    const res = await this.$axios.get('/search-popular-categories')
    ctx.commit('setPopularCategories', res.data)
  },
  async getHistory (ctx) {
    const res = await this.$axios.get('/search-history')
    ctx.commit('setHistory', res.data)
  },
  async getMorphSearchResults (ctx) {
    const res = await this.$axios.get('/morph-search-results')
    ctx.commit('setMorphSearchResults', res.data)
  }
}
