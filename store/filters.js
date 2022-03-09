export const state = () => ({
  types: [],
  classes: [],
  applicationAreas: [],
  engines: [],
  manufacturers: [],
  manufacturerCountries: [],
  filterResults: [],
  sorts: []
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
  setFilterAllManufacturers (state, array) {
    state.manufacturers = array
  },
  setFilterAllManufacturerCountries (state, array) {
    state.manufacturerCountries = array
  },
  setFilterResults (state, array) {
    state.filterResults = array
  },
  setSorts (state, array) {
    state.sorts = array
  }
}

export const actions = {
  async getFilterAllTypes (ctx) {
    const res = await this.$axios.get('/filters-types')
    ctx.commit('setFilterAllTypes', res.data)
  },
  async getFilterAllClasses (ctx) {
    const res = await this.$axios.get('/filters-classes')
    ctx.commit('setFilterAllClasses', res.data)
  },
  async getFilterAllApplicationAreas (ctx) {
    const res = await this.$axios.get('/filters-application-areas')
    ctx.commit('setFilterAllApplicationAreas', res.data)
  },
  async getFilterAllEngines (ctx) {
    const res = await this.$axios.get('/filters-engines')
    ctx.commit('setFilterAllEngines', res.data)
  },
  async getFilterAllManufacturers (ctx) {
    const res = await this.$axios.get('/filters-manufacturers')
    ctx.commit('setFilterAllManufacturers', res.data)
  },
  async getFilterAllManufacturerCountries (ctx) {
    const res = await this.$axios.get('/filters-manufacturer-countries')
    ctx.commit('setFilterAllManufacturerCountries', res.data)
  },
  async getFilterResults (ctx, data) {
    const res = await this.$axios.get('/filter-result')
    ctx.commit('setFilterResults', res.data)
  },
  async getSorts (ctx) {
    const res = await this.$axios.get('/filters-sorts')
    ctx.commit('setSorts', res.data)
  }
}
