export const state = () => ({
  title: '',
  price: 0,
  types: [],
  maxPower: 0,
  engineModel: '',
  manufacturer: {
    imgSrc: ''
  },
  descr: '',
  images: [],
  availability: '',
  updateDate: '',
  delivery: {
    date: '',
    price: 0
  },
  purchaseSteps: {
    title: '',
    list: []
  },
  characteristics: {}
})

export const mutations = {
  setProduct (state, data) {
    state.title = data.title
    state.price = data.price
    state.types = data.types
    state.maxPower = data.maxPower
    state.engineModel = data.engineModel
    state.manufacturer = data.manufacturer
    state.descr = data.descr
    state.images = data.images
    state.availability = data.availability
    state.updateDate = data.updateDate
    state.delivery = data.delivery
    state.purchaseSteps = data.purchaseSteps
    state.characteristics = data.characteristics
  }
}

export const actions = {
  async getProduct ({ commit }, id) {
    const res = await this.$axios.get('product.json')
    commit('setProduct', res.data)
  }
}
